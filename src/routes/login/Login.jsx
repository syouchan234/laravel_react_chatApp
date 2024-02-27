// LoginForm.js
import React, { useState } from 'react';
import { TextField, Button, Card } from '@mui/material';
import './Login.css';

const LoginForm = ({ onLogin }) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // ログイン処理（例: ユーザー名とパスワードの簡単な検証）
        if (mail === 'mail' && password === 'password') {
            onLogin(); // 親コンポーネントにログインを通知
        } else {
            alert('Invalid credentials');
        }
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
            <div class="interval">
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    ログイン
                </Button>
            </div>
            <div class="interval">
                <Button variant="contained" color="primary">
                    新規登録（無料）
                </Button>
            </div>
        </Card>
    );
};

export default LoginForm;
