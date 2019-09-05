import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.scss'

import { Container } from '@material-ui/core'
import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'
import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from './context/auth-context'

class App extends Component {
  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiration) => this.setState({ token: token, userId: userId })

  logout = () => this.setState({ token: null, userId: null })

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <MainNavigation />
          <Container className="content">
            <Switch>
              <Redirect
                from="/"
                to={this.state.token ? '/events' : '/auth'}
                exact
              />
              {!this.state.token && <Route path="/auth" component={AuthPage} />}
              <Route path="/events" component={EventsPage} />
              {this.state.token && <Route path="/bookings" component={BookingsPage} />}
              <Redirect from="*" to="/" />
            </Switch>
          </Container>
        </AuthContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
