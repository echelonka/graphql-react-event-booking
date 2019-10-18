import React, { Component } from 'react'
import { Box, Button, Divider, Grid, TextField, Typography, List, ListItem, ListItemText } from '@material-ui/core'

import Modal from '../components/Modal/Modal'
import AuthContext from '../context/auth-context'
import axios from "axios";

class Events extends Component {
  state = {
    createEventModal: false,
    events: []
  }

  static contextType = AuthContext

  constructor (props) {
    super(props)
    this.titleElRef = React.createRef()
    this.priceElRef = React.createRef()
    this.dateElRef = React.createRef()
    this.descriptionElRef = React.createRef()
  }

  componentDidMount () {
    this.fetchEvents()
  }

  toggleModal = () => this.setState(prevState => ({ createEventModal: !prevState.createEventModal }))

  fetchEvents = async () => {
    const data = {
      query: `
        query {
          events {
            _id
            title
            price
            description
            date
            creator {
              _id
              email
            }
          }
        }
      `
    }

    const events = (await axios.post('/api', data)).data.data.events
    this.setState({ events })
  }

  createEvent = async () => {
    const title = this.titleElRef.current.querySelector('input').value
    const price = +this.priceElRef.current.querySelector('input').value
    const date = this.dateElRef.current.querySelector('input').value
    const description = this.descriptionElRef.current.querySelector('input').value
    const data = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${ title }", price: ${ price }, date: "${ date }", description: "${ description }"}) {
            _id
            title
            price
            description
            date
            creator {
              _id
              email
            }
          }
        }
      `
    }
    const token = this.context.token

    await axios.post('/api', data, { headers: { Authorization: `Bearer ${ token }` } })
    await this.fetchEvents()
    this.setState(prevState => ({ createEventModal: !prevState.createEventModal }))
  }

  render () {
    const eventsList = this.state.events.map(event => {
      return (
        <React.Fragment key={event._id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={ event.title }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {event.creator.email}
                  </Typography>
                  { ` - ${event.description}` }
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li"/>
        </React.Fragment>
      )
    })

    return (
      <React.Fragment>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <h1>Events</h1>
          { this.context.token &&
          <Button variant="contained" color="primary" onClick={ this.toggleModal }>Create Event</Button> }
        </Box>
        <Modal
          title="Create Event"
          open={ this.state.createEventModal }
          confirm={ this.createEvent }
          closeModal={ this.toggleModal }
          canCancel
          canConfirm
        >
          <React.Fragment>
            <TextField id="title" name="title" label="Title" fullWidth margin="normal" ref={ this.titleElRef }/>
            <Grid container spacing={ 2 }>
              <Grid item xs={ 12 } md={ 6 }>
                <TextField id="price" name="price" label="Price" type="number" margin="dense" ref={ this.priceElRef }/>
              </Grid>
              <Grid item xs={ 12 } md={ 6 }>
                <TextField id="date" name="date" label="Date" type="datetime-local" margin="dense"
                           InputLabelProps={ { shrink: true } } ref={ this.dateElRef }/>
              </Grid>
            </Grid>
            <TextField id="description" name="description" label="Description" fullWidth margin="normal"
                       ref={ this.descriptionElRef }/>
          </React.Fragment>
        </Modal>
        <List>
          {eventsList}
        </List>
      </React.Fragment>
    )
  }
}

export default Events
