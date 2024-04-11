import React, { useState, useEffect } from 'react';
import { TextField, Button, Card } from '@mui/material';
import './Login.css';
import { Link } from 'react-router-dom';
import { login, isTokenCheck } from '../../api/api';

export const LoginForm = () => {

    useEffect(() => {
        const checkToken = async () => {
            const tokenCheck = await isTokenCheck();
            if (tokenCheck) window.location.href = '/mypage';
        };
        checkToken();
    }, []);

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
        login(mail, password);
    };

    //メールアドレスの正規表現
    const isValidEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const AL = () => {
        alert("お試し版にんな機能あるかいな！");
    }
    return (
        <div>
            <h1>お試し運用</h1>
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
                <br></br>
                <div onClick={AL}>パスワードを忘れた方はこちら</div>
            </Card>
        </div>
    );
};

export default LoginForm;
