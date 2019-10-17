import React, { Component } from 'react'
import { Box, Button, DialogContentText } from '@material-ui/core'

import Modal from '../components/Modal/Modal'

class Events extends Component {
  state = {
    createEventModal: false
  }

  toggleModal = () => this.setState(prevState => ({ createEventModal: !prevState.createEventModal }))

  createEvent = () => {
    console.log('Create event!')
  }

  render () {
    return (
      <React.Fragment>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <h1>Events</h1>
          <Button variant="contained" color="primary" onClick={ this.toggleModal }>Create Event</Button>
        </Box>
        <Modal
          title="Create Event"
          open={ this.state.createEventModal }
          confirm={ this.createEvent }
          closeModal={ this.toggleModal }
          canCancel
          canConfirm
        >
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Events
