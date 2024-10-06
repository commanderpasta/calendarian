import { RouterConfigurationBuilder } from '@vaadin/hilla-file-router/runtime.js';
import fileRoutes from 'Frontend/generated/file-routes.js';
import Auth from './views/auth';

export const { router, routes } = new RouterConfigurationBuilder()
  .withReactRoutes( 
    [
      { path: '/auth', element: <Auth />, handle: { title: 'Auth' } } // remove login from the MainLayout
    ]
  )
  .withFileRoutes(fileRoutes) // use file router for remaining routes
  .protect('/auth')
  .build(); 