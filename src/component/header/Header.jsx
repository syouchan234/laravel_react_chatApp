import React,{useState} from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(true); // ログイン状態を管理するためのstate

  const handleLoginLogout = () => {
    setLoggedIn((prev) => !prev); // ログイン状態を切り替えるトグル関数
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/openchat">
          Open Chat
        </Button>
        <Button color="inherit" component={Link} to="/privatechat">
          Private Chat
        </Button>
        <Button color="inherit" component={Link} to="/dm">
          DM
        </Button>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLoginLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;