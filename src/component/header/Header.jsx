import React,{useState,useEffect } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { isTokenCheck } from '../../api/api';

export const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(); // ログイン状態を管理するためのstate

  const loginAlert = () => {
    alert("ログインしてください");
  }

  useEffect(() => {
    const checkToken = async () => {
      const tokenCheck = await isTokenCheck();
      setLoggedIn(tokenCheck);
    };
    checkToken();
  }, []);
  return (
    <AppBar position="static">
      <Toolbar>
        {isLoggedIn ? (
        <Button color="inherit" component={Link} to="/">Home</Button>
        ) : (
        <Button color="inherit" onClick={loginAlert}>Home</Button>
        )}

        {isLoggedIn ? (
        <Button color="inherit" component={Link} to="/openchat">Open Chat</Button>
        ) : (
        <Button color="inherit" onClick={loginAlert}>Open Chat</Button>
        )}

        {isLoggedIn ? (
        <Button color="inherit" component={Link} to="/privatechat">Private Chat</Button>
        ) : (
        <Button color="inherit" onClick={loginAlert}>Private Chat</Button>
        )}

        {isLoggedIn ? (
        <Button color="inherit" component={Link} to="/dm">DM</Button>
        ) : (
        <Button color="inherit" onClick={loginAlert}>DM</Button>
        )}

        {isLoggedIn ? (
        <Button color="inherit" component={Link} to="/mypage">MyPage</Button>
        ) : (
        <Button color="inherit" component={Link} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;