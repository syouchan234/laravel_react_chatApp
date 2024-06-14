import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent,DialogContentText, SendIcon } from '../../muiImports';

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
        <DialogContentText>投稿に対するコメントを入力してください</DialogContentText>
          <div className="custom-text-field">
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-multiline-static"
              label="コメント内容"
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
        <Button onClick={handleClose}>キャンセル</Button>
        <Button variant="contained" color="primary" onClick={comment} type="submit" endIcon={<SendIcon />}>送信</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyForm;
