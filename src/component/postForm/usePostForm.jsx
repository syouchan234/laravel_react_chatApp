import { useState } from 'react';
import { pushPost } from '../../api/api';

const usePostForm = (onPostSuccess) => {
    const [formData, setFormData] = useState({ content: '' });
    const [open, setOpen] = useState(false);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ content: '' });
    };

    return {
        formData,
        open,
        handleInputChange,
        handleClickOpen,
        handleClose,
        post,
    };
};

export default usePostForm;
