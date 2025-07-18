const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/PageTodo.vue'),
      },
      {
        path: '/settings',
        component: () => import('pages/PageSettings.vue'),
      },
      {
        path: '/settings/help',
        component: () => import('pages/PageHelp.vue'),
      },
      {
        path: '/auth',
        component: () => import('pages/PageAuth.vue'),
      },
    ],
  },
];

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
