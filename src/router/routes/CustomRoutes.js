import { lazy } from 'react'

const CustomRoutes = [
  // Custom
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/custom/dashboard'))
  },
  {
    path: '/singular',
    component: lazy(() => import('../../views/custom/singular'))
  },
  {
    path: '/monthly',
    component: lazy(() => import('../../views/custom/monthly'))
  }
]

export default CustomRoutes
