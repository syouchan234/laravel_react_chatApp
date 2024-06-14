import React, { useState, useEffect } from 'react';
import { 
  AppBar,
  Toolbar,
  Button,
  AccountBoxIcon,
  AddCommentIcon,
  ArticleIcon,
  ChatBubbleIcon
} from '../../muiImports';
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
              <Button color="inherit" component={Link} to="/openchat"><ChatBubbleIcon/></Button>
            ) : (
              <Button color="inherit" onClick={loginAlert} disabled><ChatBubbleIcon/></Button>
            )}

            {isLoggedIn ? (
              <Button color="inherit" component={Link} to="/privatechat" disabled><ArticleIcon/></Button>
            ) : (
              <Button color="inherit" onClick={loginAlert} disabled><ArticleIcon/></Button>
            )}

            {isLoggedIn ? (
              <Button color="inherit" component={Link} to="/dm" disabled><AddCommentIcon/></Button>
            ) : (
              <Button color="inherit" onClick={loginAlert} disabled><AddCommentIcon/></Button>
            )}

            {isLoggedIn ? (
              <Button color="inherit" component={Link} to="/profile"><AccountBoxIcon/></Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">ログイン</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Header;