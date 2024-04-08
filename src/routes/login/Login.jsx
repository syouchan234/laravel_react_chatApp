import React, { useState } from 'react';
import { TextField, Button, Card } from '@mui/material';
import './Login.css';
import { Link } from 'react-router-dom';
import { login } from '../../api/api';

export const LoginForm = () => {
    const [mail, setMail] = useState(''); // メールアドレス
    const [password, setPassword] = useState(''); // パスワード

    const handleLogin = () => {
    if (!mail || !password) {
        alert('すべてのフィールドを入力してください');
        return;
    }
    if (!isValidEmail(mail)) {
        alert('有効なメールアドレスを入力してください');
        return;
    }
    login(mail,password);
    };

    //メールアドレスの正規表現
    const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
    };
    return (
        <Card className="login-card">
            <TextField
                label="メールアドレス"
                variant="outlined"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
            />
            <TextField
                label="パスワード"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="interval">
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    ログイン
                </Button>
            </div>
            <div className="interval">
                <Button variant="contained" color="primary" component={Link} to="/createaccount">
                    アカウント作成
                </Button>
            </div>
            <div>パスワードを忘れた方はこちら</div>
        </Card>
    );
};

export default LoginForm;
