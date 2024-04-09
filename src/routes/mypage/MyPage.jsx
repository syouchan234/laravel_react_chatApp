import React from 'react'
import { Button } from '@mui/material';
import { logout, pushPost } from '../../api/api';

export const MyPage = () => {
  const logoutBtn = () => {
    logout();
  }
  const posttest = () => {
    pushPost();
  }
  return (
    <div>
      <div>MyPage</div>
      <Button variant="contained" color="primary" onClick={logoutBtn}>
          Logout
        </Button>
        <Button variant="contained" color="primary" onClick={posttest}>
          postTest
        </Button>
    </div>
  )
}

export default MyPage