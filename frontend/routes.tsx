import CalendarView from 'Frontend/views/calendar/CalendarView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

const routing = [
  {
    element: <MainLayout />,
    handle: { title: 'Hilla CRM' },
    children: [
      { path: '/', element: <CalendarView />, handle: { title: 'Calendar' } },
      { path: '/about', element: <AboutView />, handle: { title: 'About' } },
    ],
  },
] as RouteObject[];

export const routes = routing;
export default createBrowserRouter(routes);
