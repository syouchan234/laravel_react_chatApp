import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { logout, getUserProfile } from '../../api/api';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log(userProfile); // 最新の userProfile の値をログに出力
  }, [userProfile]);

  //取得日時のフォーマット
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handleLogout = async () => {
    try {
      await logout();
      // ログアウト後の処理を追加
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ログアウトしてもよろしかったでしょうか？
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>いいえ</Button>
          <Button onClick={handleLogout}>はい</Button>
        </DialogActions>
      </Dialog>
      <b>アカウント情報</b>
      {userProfile && (
        <div>
          <p>ユーザー名: {userProfile.name}</p>
          <p>メールアドレス: {userProfile.email}</p>
          <b>プロフィール</b>
          <p>アカウント名: {userProfile.account_name}</p>
          <p>誕生日：{userProfile.birthday}</p>
          <p>性別：{userProfile.gender}</p>
          <p>場所：{userProfile.place}</p>
          <p>自己紹介：{userProfile.introduction}</p>
          <p>登録日時: {formatDate(userProfile.created_at)}</p>
          <p>更新日時: {formatDate(userProfile.updated_at)}</p>
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        ログアウト
      </Button>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={{
          pathname: "/editprofile",
          state: { userProfile }
        }}
      >
        プロフィールの編集
      </Button>
      <Button variant="contained" color="primary" component={Link} to="/playground">
        PlayGround
      </Button>
      <br></br>
      <b>投稿一覧</b>
      <hr></hr>
      {userProfile && userProfile.posts && (
        <div>
          {userProfile.posts.map((post) => (
            <div key={post.id}>
              <p><strong>作成日時:</strong> {formatDate(post.created_at)}</p>
              <p><strong>投稿内容:</strong> {post.content}</p>
              <hr></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
