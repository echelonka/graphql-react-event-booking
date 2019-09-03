import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.scss'

import { Container } from '@material-ui/core'
import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'
import MainNavigation from './components/Navigation/MainNavigation'

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Container className="content">
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/bookings" component={BookingsPage} />
        </Switch>
      </Container>
      {/*<main className="content">*/}
      {/*  */}
      {/*</main>*/}
    </BrowserRouter>
  )
}

export default App
