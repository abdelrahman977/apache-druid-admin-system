import React from 'react';

const Users = React.lazy(() => import('./views/users/users'));
const Roles = React.lazy(() => import('./views/roles/roles'));


const routes = [
  { path: '/roles', name: 'Roles', component: Roles },
  { path: '/users', exact: true,  name: 'Users', component: Users },
];

export default routes;
