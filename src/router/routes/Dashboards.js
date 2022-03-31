import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboards/analytics',
    component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/dashboards/ecommerce',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  }
]

export default DashboardRoutes
