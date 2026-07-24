'use client'

import {useEffect, useRef} from "react";
import styled from "styled-components";
import {useInfiniteQuery} from "@tanstack/react-query";
import AdminService from "@/services/admin.service";
import {customTheme} from "@/styles/theme";

const Wrap = styled.div`
    margin-top: clamp(2.4rem, 4vw, 3.6rem);
`

const Title = styled.h2`
    font-size: clamp(1.8rem, 3vw, 2.2rem);
    font-weight: 500;
    margin-bottom: 1.6rem;
`

const Feed = styled.div`
    background-color: ${customTheme.color.white};
    border-radius: ${customTheme.radius.r15};
    padding: clamp(1.2rem, 3vw, 2rem);
    max-height: 52rem;
    overflow-y: auto;
`

const List = styled.ul`
    display: flex;
    flex-direction: column;
`

const Item = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    padding-block: 1.4rem;
    border-bottom: 1px solid ${customTheme.color.greyLight};

    &:last-child { border-bottom: none; }
`

const Dot = styled.span`
    flex: 0 0 auto;
    width: 1rem;
    height: 1rem;
    margin-top: .5rem;
    border-radius: 50%;
    background-color: ${({$color}) => $color || customTheme.color.grey};
`

const Body = styled.div`
    flex: 1 1 auto;
    min-width: 0;
`

const Text = styled.p`
    font-size: 1.3rem;
    line-height: 1.4;
    color: ${customTheme.color.black};
    word-break: break-word;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        font-size: 1.4rem;
    }
`

const Time = styled.span`
    display: block;
    margin-top: .3rem;
    font-size: 1.1rem;
    color: ${customTheme.color.grey};
`

const Hint = styled.p`
    padding: 1.4rem;
    font-size: 1.3rem;
    color: ${customTheme.color.grey};
    text-align: center;
`

// описание типа события: цвет-маркер + текст строки
const EVENT_META = {
  user_registered: {color: '#0064cc', text: (p) => `Регистрация: ${p?.name ?? '—'}`},
  car_added: {color: '#00a06a', text: (p) => `Добавлено авто: ${[p?.brand, p?.model].filter(Boolean).join(' ') || '—'}${p?.number ? ` (${p.number})` : ''}`},
  partner_created: {color: '#e31e23', text: (p) => `Новый партнёр: ${p?.title ?? '—'}`},
  user_updated: {color: '#eab000', text: (p) => `Обновление данных: ${p?.name ?? '—'}`},
  company_updated: {color: '#8a5cf6', text: (p) => `Обновление данных компании: ${p?.title ?? '—'}`},
};

const dateFmt = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
});
const formatTime = (iso) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : dateFmt.format(d);
};

const AdminEvents = () => {

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['admin-events'],
    queryFn: ({pageParam}) => AdminService.getEvents({cursor: pageParam, limit: 15}),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor ?? undefined,
    staleTime: 30_000,
  });

  const events = data?.pages?.flatMap((page) => page?.data?.events ?? []) ?? [];

  // автозагрузка при доскролле до сентинела
  const sentinelRef = useRef(null);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, {threshold: 0.1});

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Wrap>
      <Title>Журнал событий</Title>
      <Feed data-lenis-prevent>
        {isLoading && <Hint>Загрузка…</Hint>}
        {isError && <Hint>Не удалось загрузить журнал</Hint>}
        {!isLoading && !isError && !events.length && <Hint>Событий пока нет</Hint>}

        <List>
          {events.map((event) => {
            const meta = EVENT_META[event.type];
            return (
              <Item key={event.id}>
                <Dot $color={meta?.color}/>
                <Body>
                  <Text>{meta ? meta.text(event.payload) : event.type}</Text>
                  <Time>{formatTime(event.createdAt)}</Time>
                </Body>
              </Item>
            );
          })}
        </List>

        {/* сентинел для IntersectionObserver */}
        {hasNextPage && <div ref={sentinelRef} style={{height: 1}}/>}
        {isFetchingNextPage && <Hint>Загрузка…</Hint>}
      </Feed>
    </Wrap>
  );
};

export default AdminEvents;
