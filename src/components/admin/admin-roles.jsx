'use client'

import {useState, useEffect, useMemo} from "react";
import styled from "styled-components";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Select, Button, Tag} from "antd";
import {useLenis} from "lenis/react";
import toast from "react-hot-toast";
import H1 from "@/components/UI/h1";
import AdminService from "@/services/admin.service";
import {ROLES} from "@/config/roles";
import {customTheme} from "@/styles/theme";

const Layout = styled.div`
    margin-top: clamp(2rem, 4vw, 3rem);
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: ${customTheme.breakpoint.desktop}) {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        align-items: start;
    }
`

const Panel = styled.div`
    background-color: ${customTheme.color.white};
    border-radius: ${customTheme.radius.r15};
    padding: clamp(1.6rem, 3vw, 2.4rem);
`

const PanelTitle = styled.h2`
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
`

const UserList = styled.ul`
    margin-top: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: .8rem;
    max-height: 50rem;
    overflow-y: auto;
`

const UserItem = styled.li`
    button {
        width: 100%;
        text-align: left;
        padding: 1.2rem 1.4rem;
        border-radius: ${customTheme.radius.r10};
        background-color: ${({$active}) => $active ? customTheme.color.primary : customTheme.color.lightBlue};
        color: ${({$active}) => $active ? customTheme.color.white : customTheme.color.black};
        transition: background-color ${customTheme.transition.small};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .info { display: flex; flex-direction: column; gap: .3rem; min-width: 0; }
    .name { font-size: 1.4rem; font-weight: 500; }
    .meta { font-size: 1.2rem; opacity: .8; }
`

const Hint = styled.p`
    font-size: 1.3rem;
    color: ${customTheme.color.grey};
    line-height: 1.5;
`

const Current = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    font-size: 1.3rem;
`

const EditRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        flex-direction: row;
    }

    .ant-select { flex: 1 1 auto; min-width: 0; }
`

const ROLE_OPTIONS = [
  {value: ROLES.USER, label: 'Пользователь (USER)'},
  {value: ROLES.ADMIN, label: 'Администратор (ADMIN)'},
  {value: ROLES.SUPERADMIN, label: 'Супер-админ (SUPERADMIN)'},
];

const ROLE_COLOR = {
  [ROLES.USER]: 'default',
  [ROLES.ADMIN]: 'blue',
  [ROLES.SUPERADMIN]: 'red',
};

// «главная» роль пользователя для отображения (максимальная из назначенных)
const primaryRole = (roles) => {
  if (roles?.includes(ROLES.SUPERADMIN)) return ROLES.SUPERADMIN;
  if (roles?.includes(ROLES.ADMIN)) return ROLES.ADMIN;
  return ROLES.USER;
};

const useDebounced = (value, delay = 350) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const AdminRoles = () => {

  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounced(search);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [role, setRole] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useLenis((lenis) => {
    lenis._isLocked = isSelectOpen;
  });

  const {data: usersResp, isFetching: usersLoading} = useQuery({
    queryKey: ['admin-users', debouncedSearch],
    queryFn: () => AdminService.getUsers(debouncedSearch),
    staleTime: 15_000,
  });
  const users = usersResp?.data?.users ?? [];

  const selectedUser = useMemo(
    () => users.find((u) => String(u.chatId) === String(selectedChatId)) || null,
    [users, selectedChatId],
  );

  const currentRole = selectedUser ? primaryRole(selectedUser.roles) : null;

  // при выборе пользователя подставляем его текущую роль в Select
  useEffect(() => {
    setRole(currentRole);
  }, [currentRole, selectedChatId]);

  const mutation = useMutation({
    mutationFn: ({chatId, role}) => AdminService.setRole(chatId, role),
    onSuccess: () => {
      toast.success('Роль обновлена');
      queryClient.invalidateQueries({queryKey: ['admin-users']});
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || 'Не удалось изменить роль');
    },
  });

  const handleApply = () => {
    if (!selectedUser || !role) return;
    mutation.mutate({chatId: selectedUser.chatId, role});
  };

  return (
    <div>
      <H1>Роли</H1>

      <Layout>
        <Panel>
          <PanelTitle>Пользователь</PanelTitle>
          <Input
            allowClear
            size="large"
            placeholder="Поиск по имени или chatId"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <UserList data-lenis-prevent>
            {usersLoading && !users.length && <Hint>Загрузка…</Hint>}
            {!usersLoading && !users.length && <Hint>Ничего не найдено</Hint>}
            {users.map((u) => (
              <UserItem key={u.id} $active={String(u.chatId) === String(selectedChatId)}>
                <button type="button" onClick={() => setSelectedChatId(u.chatId)}>
                  <span className="info">
                    <span className="name">{u.name}</span>
                    <span className="meta">chatId: {u.chatId}</span>
                  </span>
                  <Tag color={ROLE_COLOR[primaryRole(u.roles)]} style={{margin: 0}}>
                    {primaryRole(u.roles)}
                  </Tag>
                </button>
              </UserItem>
            ))}
          </UserList>
        </Panel>

        <Panel>
          <PanelTitle>Роль пользователя</PanelTitle>
          {!selectedUser ? (
            <Hint>Выберите пользователя слева, чтобы изменить его роль.</Hint>
          ) : (
            <>
              <Hint style={{marginBottom: '1.6rem'}}>
                {selectedUser.name} · chatId: {selectedUser.chatId}
              </Hint>

              <Current>
                <span>Текущая роль:</span>
                <Tag color={ROLE_COLOR[currentRole]} style={{margin: 0}}>{currentRole}</Tag>
              </Current>

              <EditRow>
                <Select
                  size="large"
                  value={role}
                  onChange={setRole}
                  onOpenChange={setIsSelectOpen}
                  options={ROLE_OPTIONS}
                />
                <Button
                  type="primary"
                  size="large"
                  disabled={!role || role === currentRole}
                  loading={mutation.isPending}
                  onClick={handleApply}
                >
                  Назначить
                </Button>
              </EditRow>
            </>
          )}
        </Panel>
      </Layout>
    </div>
  );
};

export default AdminRoles;
