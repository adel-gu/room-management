import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  overflow-y: scroll;
`;

const Container = styled.div`
  max-width: 130rem;
  margin-inline: auto;
  margin-block: 4rem;
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};
export default AppLayout;
