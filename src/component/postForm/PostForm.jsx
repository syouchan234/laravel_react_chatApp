import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
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
            }
        } catch (error) {
            console.error('投稿に失敗しました。', error);
            alert('投稿に失敗しました。');
        }
    };

    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="投稿内容"
                multiline
                rows={4}
                name="content"
                value={formData.content}
                onChange={handleInputChange}
            />
            <br></br>
            <Button variant="contained" color="primary" onClick={post}>
                ポスト
            </Button>
        </div>
    );
};

export default PostForm;
