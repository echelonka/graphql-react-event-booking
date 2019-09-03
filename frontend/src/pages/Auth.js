import React, { Component } from 'react'
import { Button, Card, CardContent, CardActions, Tabs, Tab, TextField } from '@material-ui/core'
import axios from 'axios'

class Auth extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    currentTab: 0
  }

  switchTab = (event, tab) => this.setState({
    email: '',
    password: '',
    errorMessage: null,
    currentTab: tab
  })

  logIn = () => {
    const data = {
      query: `
        query {
          login(email: "${ this.state.email }", password: "${ this.state.password }") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    axios.post('/api', data).then(response => {
      console.log(response.data)
    })
  }

  signUp = () => {
    const data = {
      query: `
        mutation {
          createUser(userInput: {email: "${ this.state.email }", password: "${ this.state.password }"}) {
            _id
            email
          }
        }
      `
    }

    axios.post('/api', data).then(response => {
      const data = response.data
      if (data.errors) {
        this.setState({ errorMessage: data.errors.map(error => error.message).join(' ') })
      } else {
        // TODO
      }
    })
  }

  render () {
    return (
      <Card style={ { maxWidth: 500, margin: '0 auto' } }>
        <Tabs variant="fullWidth" value={ this.state.currentTab } onChange={ this.switchTab }>
          <Tab label="Log In"/>
          <Tab label="Sign Up"/>
        </Tabs>
        <CardContent style={ { textAlign: 'center' } }>
          <div>
            <TextField
              required
              label="Email"
              id="email"
              type="email"
              fullWidth
              error={ !!this.state.errorMessage }
              onChange={ e => this.setState({ email: e.target.value, errorMessage: '' }) }
              value={ this.state.email }
              helperText={ this.state.errorMessage }
              margin="normal"
            />
          </div>
          <div>
            <TextField
              required
              label="Password"
              id="password"
              type="password"
              fullWidth
              onChange={ e => this.setState({ password: e.target.value }) }
              value={ this.state.password }
              margin="normal"
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={ () => this.state.currentTab === 0 ? this.logIn() : this.signUp() }
            disabled={ !this.state.email || !this.state.password }
          >
            { this.state.currentTab === 0 ? 'Log In' : 'Sign Up' }
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default Auth
