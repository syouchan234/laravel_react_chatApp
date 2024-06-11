// src/component/replyForm/ReplyForm.js
import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogTitle } from '@mui/material';

const ReplyForm = ({ open, handleClose, handleInputChange, formData, comment }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        返信
      </DialogTitle>
      <TextField
        autoFocus
        required
        margin="dense"
        id="outlined-multiline-static"
        label="投稿内容"
        multiline
        name="content"
        value={formData.content}
        fullWidth
        variant="outlined"
        onChange={handleInputChange}
      />
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button variant="contained" color="primary" onClick={comment}>SEND</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyForm;
