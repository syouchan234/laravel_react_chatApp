import React, { useState } from 'react';
import {
    Button,
    TextField,
    Fab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { pushPost } from '../../api/api';

const PostForm = ({ onPostSuccess }) => {
    const [formData, setFormData] = useState({
        content: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const post = async () => {
        const { content } = formData;
        if (!content) {
            alert("投稿内容を入力してください");
            return;
        }
        try {
            await pushPost(content);
            if (onPostSuccess) {
                onPostSuccess();
                handleClose();
            }
        } catch (error) {
            console.error('投稿に失敗しました。', error);
            alert('投稿に失敗しました。もう一度お試しください。');
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ content: '' }); // フォームをクリアする
    };

    return (
        <div>
            <Fab color="secondary" aria-label="edit" onClick={handleClickOpen} style={{ position: "fixed", bottom: 16, right: 16 }}>
                <EditIcon />
            </Fab>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        post(); // フォーム送信時に投稿する
                    },
                }}
            >
                <DialogTitle>投稿</DialogTitle>
                <DialogContent>
                    <DialogContentText>投稿内容を入力してください</DialogContentText>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button variant="contained" onClick={post} endIcon={<SendIcon />} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PostForm;
