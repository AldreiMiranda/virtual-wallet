
import React from 'react'
import { DialogTitle, DialogContent, Dialog } from '@material-ui/core'

export default props => {
  const { modalNotification, handleCloseNotification } = props
  return (
    <Dialog open fullWidth maxWidth="xs" onClose={handleCloseNotification} >
      <DialogTitle style={{ backgroundColor: 'green', color: 'white' }}>  <b>{modalNotification.title} </b> </DialogTitle>
      <DialogContent>
        <div>
          <center>
            <h3 style={{ color: 'green' }}> {modalNotification.message} </h3>
          </center>
        </div>
      </DialogContent>
    </Dialog>
  )
}
