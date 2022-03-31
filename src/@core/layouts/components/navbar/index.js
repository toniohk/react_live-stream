// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

import themeConfig from '@configs/themeConfig'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin } = props
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(props.routerProps.match.path)
  }, [props])

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <div className="w-100 d-flex align-items-center justify-content-center position-relative">
        <div className='bookmark-wrapper d-flex align-items-center position-absolute' style={{ left: 0 }}>
          <h2 className='brand-text mb-0'>{themeConfig.app.appName}</h2>
        </div>
        <div className='d-flex align-items-center'>
          <NavItem className='d-none d-lg-block' active={path === '/dashboard'}>
            <Link to="/dashboard">
              <span>Dashboard</span>
            </Link>
          </NavItem>
          <NavItem className='d-none d-lg-block' active={path === '/singular'}>
            <Link to="/singular">
              <span>Singular</span>
            </Link>
          </NavItem>
          <NavItem className='d-none d-lg-block' active={path === '/monthly'}>
            <Link to="/monthly">
              <span>Monthly</span>
            </Link>
          </NavItem>
        </div>
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </ul>
    </Fragment>
  )
}

export default ThemeNavbar
