import React from 'react'
import { Button } from '@mui/material';
import { logout } from '../../api/api';

export const MyPage = () => {
  const logoutBtn = () => {
    logout();
  }
  return (
    <div>
      <div>MyPage</div>
      <Button variant="contained" color="primary" onClick={logoutBtn}>
          Logout
      </Button>
    </div>
  )
}

export default MyPage