import { AppLayout, Button, DrawerToggle } from '@vaadin/react-components';
import MenuButton from 'Frontend/components/MenuButton';
import logo from 'Frontend/assets/images/logo.png';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import { Suspense, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth';

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  useEffect(() => {
    document.title = `Calendarian - ${currentTitle}`;
  }, [currentTitle]);

  const { state, logout } = useAuth();

  return (
    <AppLayout primarySection="drawer">
      <div slot="navbar" className="flex justify-between w-full">
        <span className="flex items-center">
          <DrawerToggle  aria-label="Menu toggle"/>
          <h2 className="text-l m-0">
              {currentTitle}
          </h2>
        </span>

        <span className="mr-3">
          {state.user ? (
            <>
              <div className="flex items-center gap-x-2">
                <span>{`Welcome, ${state.user.name}.`}</span>
                <Button onClick={async () => logout} className="!bg-teal-200 !text-black" theme="primary">Sign out</Button>
              </div>
            </>
          ) : (
            <a href="/login">
              <Button className="w-full text-teal-200">Sign in</Button>
            </a>
          )}
        </span>
      </div>

      <div slot="drawer">
        <header>          
          <nav className="flex flex-col gap-2">
            <NavLink to="/" className="bg-teal-200 hover:bg-teal-300 rounded-xl mt-2 mx-2"><img src={logo} /></NavLink>
  
            {state.user ? (
              <>
                <MenuButton label="Calendar" toPath="/calendar" />
                <MenuButton label="About" toPath="/about" />
              </>
            ) : (<></>)}
          </nav>
        </header>
      </div>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
