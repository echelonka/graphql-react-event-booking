import React, { Component } from 'react'
import { Button, Card, CardContent, CardActions, Tabs, Tab, TextField, InputAdornment } from '@material-ui/core'
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons'
import axios from 'axios'
import AuthContext from '../context/auth-context'

class Auth extends Component {
  state = {
    email: '',
    password: '',
    emailError: null,
    passwordError: null,
    currentTab: 0
  }

  switchTab = (event, tab) => this.setState({
    email: '',
    password: '',
    emailError: null,
    passwordError: null,
    currentTab: tab
  })

  setErrors = errors => this.setState({
    emailError: errors.filter(error => error.type === 'INVALID_EMAIL').map(error => error.message).join(' '),
    passwordError: errors.filter(error => error.type === 'INVALID_PASSWORD').map(error => error.message).join(' ')
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
      const data = response.data.data
      if (data.login.token) {
        this.context.login(
          data.login.token,
          data.login.userId,
          data.login.tokenExpiration
        )
        this.props.history.replace('/')
      }
    })
      .catch(({ response }) => this.setErrors(response.data.errors))
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

    axios.post('/api', data).then(({ data }) => {
      if (data.errors) {
        this.setErrors(data.errors)
      } else {
        // TODO New user created
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
              error={ !!this.state.emailError }
              onChange={ e => this.setState({ email: e.target.value, emailError: '' }) }
              value={ this.state.email }
              helperText={ this.state.emailError }
              margin="normal"
              InputProps={ {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlined color={ this.state.emailError ? 'error' : 'action' }/>
                  </InputAdornment>
                ),
              } }
            />
          </div>
          <div>
            <TextField
              required
              label="Password"
              id="password"
              type="password"
              fullWidth
              error={ !!this.state.passwordError }
              onChange={ e => this.setState({ password: e.target.value, passwordError: '' }) }
              value={ this.state.password }
              helperText={ this.state.passwordError }
              margin="normal"
              InputProps={ {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color={ this.state.passwordError ? 'error' : 'action' }/>
                  </InputAdornment>
                ),
              } }
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

Auth.contextType = AuthContext

export default Auth
