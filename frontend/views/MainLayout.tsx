import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import MenuButton from 'Frontend/components/MenuButton';
import logo from '../assets/images/logo.png';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import { Suspense, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  return (
    <AppLayout primarySection="drawer">
      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>

      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header>
          <NavLink to="/"><img src={logo} /></NavLink>
          
          <nav className="flex flex-col gap-2">
            <MenuButton label="Calendar" toPath="/" />
            <MenuButton label="Contacts" toPath="/contacts" />
            <MenuButton label="About" toPath="/about" />
          </nav>
        </header>
      </div>

      <h2 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h2>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
