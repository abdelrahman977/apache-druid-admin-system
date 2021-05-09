import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Druid Auth']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    route: '/pages/Users',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Roles',
    to: '/roles',
    route: '/pages/roles',
    icon: <CIcon name="cil-cog" customClasses="c-sidebar-nav-icon"/>,
  }
]

export default _nav
