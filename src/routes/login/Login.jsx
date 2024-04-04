import React, { useState } from 'react';
import { TextField, Button, Card } from '@mui/material';
import './Login.css';
import { Link } from 'react-router-dom';

export const LoginForm = ({ onLogin }) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // ログイン処理（例: ユーザー名とパスワードの簡単な検証）
        if (mail === 'mail' && password === 'password') {
            onLogin(); // 親コンポーネントにログインを通知
        } else {
            alert('失敗');
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
                <Button variant="contained" color="primary" component={Link} to="/createaccount">
                    アカウント作成
                </Button>
            </div>
            <div>パスワードを忘れた方はこちら</div>
        </Card>
    );
};

export default LoginForm;
