import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import './MainNavigation.scss'
import AuthContext from '../../context/auth-context'

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => (
      <AppBar position="static" className="main-navigation">
        <Toolbar>
          <Typography variant="h5" style={ { flexGrow: 1 } }>
            Easy Event
          </Typography>
          {!context.token ? (
            <NavLink to="/auth" className="main-navigation__link">
              <Button color="inherit">Authenticate</Button>
            </NavLink>
          ) : null}
          <NavLink to="/events" className="main-navigation__link">
            <Button color="inherit">Events</Button>
          </NavLink>
          {context.token && (
            <NavLink to="/bookings" className="main-navigation__link">
              <Button color="inherit">Bookings</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    )}
  </AuthContext.Consumer>
)

export default mainNavigation
