import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button } from '../../muiImports';
import { Link } from 'react-router-dom';
import { isTokenCheck } from '../../api/api';
import './Header.css';

export const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(); // ログイン状態を管理するためのstate

  const loginAlert = () => {
    alert("ログインしてください");
  }

  useEffect(() => {
    const checkToken = async () => {
      const tokenCheck = isTokenCheck();
      setLoggedIn(tokenCheck);
    };
    checkToken();
  }, []);
  return (
    <div className="header">
      <div className="toolbar">
        <AppBar position="static" >
          <Toolbar>
            {isLoggedIn ? (
              <Button color="inherit" component={Link} to="/openchat">Open</Button>
            ) : (
              <Button color="inherit" onClick={loginAlert} disabled>Open</Button>
            )}

            {isLoggedIn ? (
              <Button color="inherit" component={Link} to="/privatechat" disabled>Private</Button>
            ) : (
              <Button color="inherit" onClick={loginAlert} disabled>Private</Button>
            )}

            {isLoggedIn ? (
              <Button color="inherit" component={Link} to="/dm" disabled>DM</Button>
            ) : (
              <Button color="inherit" onClick={loginAlert} disabled>DM</Button>
            )}

            {isLoggedIn ? (
              <Button color="inherit" component={Link} to="/profile">Profile</Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Header;