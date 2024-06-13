import React from 'react';
import {
    TextField,
    Button,
    Card,
    FormControl,
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Visibility,
    VisibilityOff
} from '../../muiImports'
import './Login.css';
import { Link } from 'react-router-dom';
import useLogin from './useLogin';

export const LoginForm = () => {
    const {
        mail,
        setMail,
        password,
        setPassword,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleLogin
    } = useLogin();

    const AL = () => {
        alert('お試し版にはんな機能あるかいな！');
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
