import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const AppLayout = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default AppLayout;
