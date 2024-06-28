import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  height: 100vh;

  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <main>
        <Outlet />
      </main>
    </StyledAppLayout>
  );
};
export default AppLayout;
