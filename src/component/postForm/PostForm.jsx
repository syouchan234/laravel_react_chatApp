import React from 'react';
import {
    Button,
    TextField,
    Fab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    EditIcon,
    SendIcon
} from '../../muiImports';
import usePostForm from './usePostForm';
import './PostForm.css';

const PostForm = ({ onPostSuccess }) => {
    const {
        formData,
        open,
        handleInputChange,
        handleClickOpen,
        handleClose,
        post,
    } = usePostForm(onPostSuccess);

    return (
        <div>
            <Fab color="secondary" aria-label="edit" onClick={handleClickOpen} style={{ position: "fixed", bottom: 16, right: 16 }}>
                <EditIcon />
            </Fab>

            <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: (event) => { event.preventDefault(); post(); }, }}>
                <DialogTitle>投稿</DialogTitle>
                <DialogContent>
                    <DialogContentText>投稿内容を入力してください</DialogContentText>
                    <div className="custom-text-field">
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
                            onChange={handleInputChange}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">キャンセル</Button>
                    <Button variant="contained" type="submit" endIcon={<SendIcon />} color="primary">
                        送信
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PostForm;
