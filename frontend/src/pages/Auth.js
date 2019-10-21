import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardContent, CardActions, Tabs, Tab, TextField, InputAdornment } from '@material-ui/core'
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons'
import axios from 'axios'
import AuthContext from '../context/auth-context'

function Auth () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [currentTab, setTab] = useState(0)

  const context = useContext(AuthContext)
  const history = useHistory()

  const switchTab = (event, tab) => {
    setEmail('')
    setPassword('')
    setEmailError('')
    setPasswordError('')
    setTab(tab)
  }

  const setErrors = errors => {
    setEmailError(errors.filter(error => error.type === 'INVALID_EMAIL').map(error => error.message).join(' '))
    setPasswordError(errors.filter(error => error.type === 'INVALID_PASSWORD').map(error => error.message).join(' '))
  }

  const logIn = () => {
    const data = {
      query: `
        query {
          login(email: "${ email }", password: "${ password }") {
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
        context.login(
          data.login.token,
          data.login.userId,
          data.login.tokenExpiration
        )
        history.replace('/')
      }
    })
      .catch(({ response }) => setErrors(response.data.errors))
  }

  const signUp = async () => {
    const data = {
      query: `
        mutation {
          createUser(userInput: {email: "${ email }", password: "${ password }"}) {
            _id
            email
          }
        }
      `
    }
    const response = (await axios.post('/api', data)).data
    if (response.errors) {
      setErrors(response.errors)
    } else {
      // TODO New user created
    }
  }

  return (
      <Card style={ { maxWidth: 500, margin: '0 auto' } }>
        <Tabs variant="fullWidth" value={ currentTab } onChange={ switchTab }>
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
              error={ !!emailError }
              onChange={ e => { setEmail(e.target.value); setEmailError('') } }
              value={ email }
              helperText={ emailError }
              margin="normal"
              InputProps={ {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlined color={ emailError ? 'error' : 'action' }/>
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
              error={ !!passwordError }
              onChange={ e => { setPassword(e.target.value); setPasswordError('') } }
              value={ password }
              helperText={ passwordError }
              margin="normal"
              InputProps={ {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color={ passwordError ? 'error' : 'action' }/>
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
            onClick={ () => currentTab === 0 ? logIn() : signUp() }
            disabled={ !email || !password }
          >
            { currentTab === 0 ? 'Log In' : 'Sign Up' }
          </Button>
        </CardActions>
      </Card>
    )
}

export default Auth
