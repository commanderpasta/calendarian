import { AppLayout } from '@vaadin/react-components/AppLayout.js';
import { DrawerToggle } from '@vaadin/react-components/DrawerToggle.js';
import MenuButton from 'Frontend/components/MenuButton';
import logo from 'Frontend/assets/images/logo.png';
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

      <div slot="drawer">
        <header>
          <NavLink to="/"><img src={logo} /></NavLink>
          
          <nav className="flex flex-col gap-2">
            <MenuButton label="Calendar" toPath="/calendar" />
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
