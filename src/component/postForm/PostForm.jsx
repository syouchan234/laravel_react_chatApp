import React, { useState } from 'react';
import { Button, TextField, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { pushPost } from '../../api/api';

const PostForm = ({ onPostSuccess }) => {
    const [formData, setFormData] = useState({
        content: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, content: e.target.value });
    };

    const post = async () => {
        const { content } = formData;
        if (!content) {
            alert("入力してください");
            return;
        }
        try {
            await pushPost(content);
            // 投稿が成功したら親コンポーネントに通知する
            if (onPostSuccess) {
                onPostSuccess();
                handleClose();
            }
        } catch (error) {
            console.error('投稿に失敗しました。', error);
            alert('投稿に失敗しました。');
        }
    };

    const [open, setOpen] = React.useState(false);
    // ダイアログの表示非表示の制御
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};

    return (
        <div>
            <Fab color="secondary" aria-label="edit" onClick={handleClickOpen}>
                <EditIcon />
            </Fab>

            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>投稿</DialogTitle>
                    <DialogContent>
                        <DialogContentText>投稿内容を入力してもろて</DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="outlined-multiline-static"
                            label="投稿内容"
                            multiline
                            rows={4}
                            name="content"
                            value={formData.content}
                            fullWidth
                            variant="standard"
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={post}>ポスト</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

export default PostForm;
