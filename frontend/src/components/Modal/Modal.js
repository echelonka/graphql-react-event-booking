import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

const modal = props => (
  <Dialog open={ props.open } aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">{ props.title || '' }</DialogTitle>
    <DialogContent>
      { props.children }
    </DialogContent>
    <DialogActions>
      { props.canCancel && <Button onClick={ props.closeModal } color="primary">Cancel</Button> }
      { props.canConfirm && <Button onClick={ props.confirm } color="primary">Confirm</Button> }
    </DialogActions>
  </Dialog>
)

export default modal
