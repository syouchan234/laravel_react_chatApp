import React from 'react'
import { Button } from '@mui/material';
import { logout,pushComment } from '../../api/api';

export const MyPage = () => {
  const logoutBtn = () => {
    logout();
  }
  const commentBtn = () => {
    pushComment();
  }
  return (
    <div>
      <div>MyPage</div>
      <Button variant="contained" color="primary" onClick={logoutBtn}>
        Logout
      </Button>
      <Button variant="contained" color="primary" onClick={commentBtn}>
        CommentTest
      </Button>
    </div>
  )
}

export default MyPage