import React, { useState } from 'react';
import { Button,TextField } from '@mui/material';

const PostForm = () => {
    const [formData, setFormData] = useState({
        content: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="投稿内容"
                multiline
                rows={4}
                name="name"
                value={formData.content}
                onChange={handleInputChange}
            />
            <br></br>
            <Button variant="contained" color="primary">
                ポスト
            </Button>
        </div>

    )
}

export default PostForm;