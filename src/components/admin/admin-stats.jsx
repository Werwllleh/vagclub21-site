'use client'

import styled from "styled-components";
import {useQuery} from "@tanstack/react-query";
import H1 from "@/components/UI/h1";
import AdminService from "@/services/admin.service";
import {customTheme} from "@/styles/theme";

const Cards = styled.div`
    margin-top: clamp(2rem, 4vw, 3rem);
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.6rem;

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        grid-template-columns: repeat(3, 1fr);
    }
`

const Card = styled.div`
    padding: clamp(2rem, 4vw, 3rem);
    background-color: ${customTheme.color.white};
    border-radius: ${customTheme.radius.r15};
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const CardLabel = styled.span`
    font-size: 1.3rem;
    color: ${customTheme.color.grey};

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        font-size: 1.4rem;
    }
`

const CardValue = styled.strong`
    font-family: ${customTheme.font.primary};
    font-size: clamp(2.8rem, 6vw, 4rem);
    font-weight: 600;
    color: ${customTheme.color.primaryDark};
    line-height: 1;
`

const STAT_ITEMS = [
  {key: 'users', label: 'Пользователи'},
  {key: 'cars', label: 'Авто'},
  {key: 'partners', label: 'Партнёры'},
];

const AdminStats = () => {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => AdminService.getStats(),
    staleTime: 60_000,
  });

  const stats = data?.data;

  return (
    <div>
      <H1>Дашборд</H1>
      <Cards>
        {STAT_ITEMS.map((item) => (
          <Card key={item.key}>
            <CardLabel>{item.label}</CardLabel>
            <CardValue>
              {isError ? '—' : isLoading ? '…' : (stats?.[item.key] ?? 0)}
            </CardValue>
          </Card>
        ))}
      </Cards>
    </div>
  );
};

export default AdminStats;
