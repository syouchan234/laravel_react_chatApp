import { useState, useEffect } from 'react';
import { login, isTokenCheck } from '../../api/api';

function useLogin() {
    const [mail, setMail] = useState(''); // メールアドレス
    const [password, setPassword] = useState(''); // パスワード
    const [showPassword, setShowPassword] = useState(false); // パスワード表示制御用

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const isValidEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const handleLogin = async () => {
        if (!mail || !password) {
            alert('すべてのフィールドを入力してください');
            return;
        }
        if (!isValidEmail(mail)) {
            alert('有効なメールアドレスを入力してください');
            return;
        }
        await login(mail, password);
    };

    useEffect(() => {
        const checkToken = async () => {
            const tokenCheck = await isTokenCheck();
            if (tokenCheck) window.location.href = '/profile';
        };
        checkToken();
    }, []);

    return {
        mail,
        setMail,
        password,
        setPassword,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleLogin
    };
}

export default useLogin;
