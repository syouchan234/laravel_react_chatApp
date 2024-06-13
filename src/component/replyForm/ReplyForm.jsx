import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent,DialogContentText } from '../../muiImports';

const ReplyForm = ({ open, handleClose, handleInputChange, formData, comment }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">返信</DialogTitle>
        <DialogContent>
        <DialogContentText>返信する内容を入力してください</DialogContentText>
          <div className="custom-text-field">
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-multiline-static"
              label="返信"
              multiline
              name="content"
              value={formData.content}
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
            />
          </div>
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button variant="contained" color="primary" onClick={comment}>SEND</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyForm;
