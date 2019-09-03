import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import './MainNavigation.scss'

const navLinks = [
  { link: '/auth', name: 'Authenticate' },
  { link: '/events', name: 'Events' },
  { link: '/bookings', name: 'Bookings' },
]

const mainNavigation = props => (
  <AppBar position="static" className="main-navigation">
    <Toolbar>
      <Typography variant="h5" style={ { flexGrow: 1 } }>
        Easy Event
      </Typography>
      { navLinks.map(link => (
        <NavLink to={ link.link } className="main-navigation__link" key={ link.link }>
          <Button color="inherit">{ link.name }</Button>
        </NavLink>
      )) }
    </Toolbar>
  </AppBar>
)

export default mainNavigation
