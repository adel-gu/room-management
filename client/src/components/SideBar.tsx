import styled from 'styled-components';

import {
  BarChart3,
  Bed,
  CalendarRange,
  PersonStanding,
  Settings,
  Users,
} from 'lucide-react';

import SideNavLink from './SideNavLink';
import Logo from './ui/Logo';
import { Link } from 'react-router-dom';

const StyledSideBar = styled.aside`
  grid-row: 1 / -1;

  border-right: 1px solid var(--color-grey-100);

  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  padding: 3.2rem 2.4rem;

  background-color: var(--color-grey-0);
`;

const navLinks = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <BarChart3 />,
  },
  {
    title: 'Bookings',
    path: '/bookings',
    icon: <CalendarRange />,
  },
  {
    title: 'Guests',
    path: '/guests',
    icon: <PersonStanding />,
  },
  {
    title: 'Rooms',
    path: '/rooms',
    icon: <Bed />,
  },
  {
    title: 'Admins',
    path: '/admins',
    icon: <Users />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings />,
  },
];

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SideBar = () => {
  return (
    <StyledSideBar>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <NavList>
          {navLinks.map((navLink) => (
            <li key={navLink.title}>
              <SideNavLink title={navLink.title} path={navLink.path}>
                {navLink.icon}
              </SideNavLink>
            </li>
          ))}
        </NavList>
      </nav>
    </StyledSideBar>
  );
};
export default SideBar;
