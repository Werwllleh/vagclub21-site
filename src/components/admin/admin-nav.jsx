'use client'

import styled from "styled-components";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {customTheme} from "@/styles/theme";
import {useUser} from "@/hooks/useUser";
import {isSuperadmin} from "@/config/roles";

const Nav = styled.nav`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: clamp(2rem, 4vw, 3rem);
`

const NavLink = styled(Link)`
    padding-block: 1rem;
    padding-inline: 1.8rem;
    border-radius: ${customTheme.radius.r20};
    font-size: 1.3rem;
    font-weight: 500;
    background-color: ${({$active}) => $active ? customTheme.color.primary : customTheme.color.lightBlue};
    color: ${({$active}) => $active ? customTheme.color.white : customTheme.color.primaryDark};
    transition: background-color ${customTheme.transition.small}, color ${customTheme.transition.small};

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        font-size: 1.4rem;
        &:hover {
            background-color: ${customTheme.color.primary};
            color: ${customTheme.color.white};
        }
    }
`

const LINKS = [
  {title: 'Дашборд', href: '/admin'},
  {title: 'Партнёры', href: '/admin/partners'},
  {title: 'Роли', href: '/admin/roles', superadminOnly: true},
];

const AdminNav = () => {
  const pathname = usePathname();
  const {user} = useUser();
  const canManageRoles = isSuperadmin(user?.roles);

  return (
    <Nav>
      {LINKS.filter((link) => !link.superadminOnly || canManageRoles).map((link) => {
        const active = link.href === '/admin'
          ? pathname === '/admin'
          : pathname.startsWith(link.href);
        return (
          <NavLink key={link.href} href={link.href} $active={active}>
            {link.title}
          </NavLink>
        );
      })}
    </Nav>
  );
};

export default AdminNav;
