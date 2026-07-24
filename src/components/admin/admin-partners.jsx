'use client'

import {useState, useEffect, useMemo} from "react";
import styled from "styled-components";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Select, Button} from "antd";
import {useLenis} from "lenis/react";
import toast from "react-hot-toast";
import H1 from "@/components/UI/h1";
import AdminService from "@/services/admin.service";
import CmsService from "@/services/cms.service";
import {customTheme} from "@/styles/theme";

const Layout = styled.div`
    margin-top: clamp(2rem, 4vw, 3rem);
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: ${customTheme.breakpoint.desktop}) {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
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
        flex-direction: column;
        gap: .3rem;
    }

    .name { font-size: 1.4rem; font-weight: 500; }
    .meta { font-size: 1.2rem; opacity: .8; }
`

const Hint = styled.p`
    font-size: 1.3rem;
    color: ${customTheme.color.grey};
    line-height: 1.5;
`

const Companies = styled.ul`
    display: flex;
    flex-direction: column;
    gap: .8rem;
    margin-bottom: 2rem;
`

const CompanyItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.4rem;
    background-color: ${customTheme.color.lightBlue};
    border-radius: ${customTheme.radius.r10};
    font-size: 1.3rem;
`

const AttachRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        flex-direction: row;
    }

    .ant-select { flex: 1 1 auto; min-width: 0; }
`

// небольшой дебаунс для поля поиска, чтобы не дёргать бэк на каждый символ
const useDebounced = (value, delay = 350) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const AdminPartners = () => {

  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounced(search);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [companyToAttach, setCompanyToAttach] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // при открытом дропдауне блокируем плавный скролл страницы (Lenis),
  // иначе позиция дропдауна дёргается при прокрутке
  useLenis((lenis) => {
    lenis._isLocked = isSelectOpen;
  });

  // список пользователей (поиск по chatId/имени)
  const {data: usersResp, isFetching: usersLoading} = useQuery({
    queryKey: ['admin-users', debouncedSearch],
    queryFn: () => AdminService.getUsers(debouncedSearch),
    staleTime: 15_000,
  });
  const users = usersResp?.data?.users ?? [];

  // все партнёры из CMS (их немного) — для выбора компании и отображения названий
  const {data: partnersResp} = useQuery({
    queryKey: ['cms-partners-all'],
    queryFn: () => CmsService.fetchPartners({page: 1, limit: 100}),
    staleTime: 5 * 60_000,
  });
  const partners = partnersResp?.data?.partners ?? [];

  const partnerTitleById = useMemo(() => {
    const map = new Map();
    partners.forEach((p) => map.set(String(p.id), p.title));
    return map;
  }, [partners]);

  const selectedUser = useMemo(
    () => users.find((u) => String(u.chatId) === String(selectedChatId)) || null,
    [users, selectedChatId],
  );

  const attachMutation = useMutation({
    mutationFn: ({chatId, companyId}) => AdminService.attachCompany(chatId, companyId),
    onSuccess: () => {
      toast.success('Компания привязана');
      setCompanyToAttach(null);
      queryClient.invalidateQueries({queryKey: ['admin-users']});
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || 'Не удалось привязать компанию');
    },
  });

  const detachMutation = useMutation({
    mutationFn: ({chatId, companyId}) => AdminService.detachCompany(chatId, companyId),
    onSuccess: () => {
      toast.success('Компания откреплена');
      queryClient.invalidateQueries({queryKey: ['admin-users']});
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || 'Не удалось открепить компанию');
    },
  });

  const attachedIds = (selectedUser?.companies ?? []).map(String);

  // опции для Select — все партнёры, кроме уже привязанных выбранному юзеру
  const companyOptions = partners
    .filter((p) => !attachedIds.includes(String(p.id)))
    .map((p) => ({value: p.id, label: p.title || `#${p.id}`}));

  const handleAttach = () => {
    if (!selectedUser || companyToAttach == null) return;
    attachMutation.mutate({chatId: selectedUser.chatId, companyId: companyToAttach});
  };

  return (
    <div>
      <H1>Партнёры</H1>

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
                  <span className="name">{u.name}</span>
                  <span className="meta">chatId: {u.chatId} · компаний: {u.companies?.length ?? 0}</span>
                </button>
              </UserItem>
            ))}
          </UserList>
        </Panel>

        <Panel>
          <PanelTitle>Компании пользователя</PanelTitle>
          {!selectedUser ? (
            <Hint>Выберите пользователя слева, чтобы управлять его компаниями.</Hint>
          ) : (
            <>
              <Hint style={{marginBottom: '1.6rem'}}>
                {selectedUser.name} · chatId: {selectedUser.chatId}
              </Hint>

              <Companies>
                {!attachedIds.length && <Hint>Компаний пока нет.</Hint>}
                {attachedIds.map((id) => (
                  <CompanyItem key={id}>
                    <span>{partnerTitleById.get(id) || `Компания #${id}`}</span>
                    <Button
                      danger
                      size="small"
                      loading={detachMutation.isPending && detachMutation.variables?.companyId === Number(id)}
                      onClick={() => detachMutation.mutate({chatId: selectedUser.chatId, companyId: Number(id)})}
                    >
                      Открепить
                    </Button>
                  </CompanyItem>
                ))}
              </Companies>

              <AttachRow>
                <Select
                  size="large"
                  showSearch
                  allowClear
                  placeholder="Выберите компанию"
                  optionFilterProp="label"
                  value={companyToAttach}
                  onChange={(v) => setCompanyToAttach(v ?? null)}
                  onOpenChange={setIsSelectOpen}
                  options={companyOptions}
                  notFoundContent="Нет доступных компаний"
                />
                <Button
                  type="primary"
                  size="large"
                  disabled={companyToAttach == null}
                  loading={attachMutation.isPending}
                  onClick={handleAttach}
                >
                  Привязать
                </Button>
              </AttachRow>
            </>
          )}
        </Panel>
      </Layout>
    </div>
  );
};

export default AdminPartners;
