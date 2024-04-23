import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, FormControl } from '@mui/material';
import './Login.css';
import { Link } from 'react-router-dom';
import { login, isTokenCheck } from '../../api/api';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    const [showPassword, setShowPassword] = useState(false); // パスワード表示制御用

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

    // メールアドレスの正規表現
    const isValidEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const AL = () => {
        alert('お試し版にはんな機能あるかいな！');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="パスワード"
                    />
                </FormControl>
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
                <br />
                <div onClick={AL}>パスワードを忘れた方はこちら</div>
            </Card>
        </div>
    );
};

export default LoginForm;
