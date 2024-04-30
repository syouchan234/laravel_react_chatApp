import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { logout, getUserProfile, deleteUser } from '../../api/api';
import { Link } from 'react-router-dom';
import { editProfileInf } from '../editprofile/EditProfile';
import { useParams } from 'react-router-dom';

const MyPage = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [accountDeleteConfirmDialog, setAccountDeleteConfirmDialog] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(id);
        setUserProfile(data);
        setIsOwnProfile(data.isOwnProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  //取得日時のフォーマット
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  // ログアウト処理の実行
  const handleLogout = async () => {
    try {
      await logout();
      // ログアウト後の処理を追加
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // アカウント削除処理
  const deleteAccount = async () => {
    try {
      await deleteUser();
      // アカウント削除後の処理を追加
    } catch (error) {
      console.error('Account deletion error:', error);
    }
  };

  // 編集ページに情報を送信するハンドラー
  const postEditProfilePage = () => {
    editProfileInf(
      userProfile.account_name,
      userProfile.birthday,
      userProfile.gender,
      userProfile.place,
      userProfile.introduction
    );
  };

  return (
    <div>
      {userProfile && (
        <div>
          {isOwnProfile ? (
            <div>
              <b>アカウント情報</b>
              <p>ユーザー名: {userProfile.name}</p>
              <p>メールアドレス: {userProfile.email}</p>
              <b>プロフィール</b>
            </div>
          ) : (
            <b>☆プロフィール☆</b>
          )}
          <p>アカウント名: {userProfile.account_name}</p>
          <p>誕生日：{userProfile.birthday}</p>
          <p>性別：{userProfile.gender}</p>
          <p>場所：{userProfile.place}</p>
          <p>自己紹介：{userProfile.introduction}</p>
          <p>登録日時: {formatDate(userProfile.created_at)}</p>
          <p>更新日時: {formatDate(userProfile.updated_at)}</p>
          {isOwnProfile && (
            <div>
              <Button variant="contained" color="primary" onClick={() => setLogoutDialog(true)}>
                ログアウト
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                onClick={postEditProfilePage}
                to={{ pathname: '/editprofile' }}
              >
                プロフィールの編集
              </Button>
              <Button variant="contained" color="primary" onClick={() => setAccountDeleteConfirmDialog(true)}>
                アカウント削除
              </Button>
              <Button variant="contained" color="primary" component={Link} to="/playground">
                PlayGround
              </Button>
            </div>
          )}
        </div>
      )}
      <Dialog
        open={logoutDialog}
        onClose={() => setLogoutDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ログアウトしてもええか？
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)}>やめいや</Button>
          <Button onClick={handleLogout}>ええで</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={accountDeleteConfirmDialog}
        onClose={() => setAccountDeleteConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          アカウント消えてまうで？
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setAccountDeleteConfirmDialog(false)}>やめいや</Button>
          <Button onClick={deleteAccount}>ええで</Button>
        </DialogActions>
      </Dialog>

      <br></br>
      <b>投稿一覧</b>
      <hr></hr>
      {userProfile && userProfile.posts && (
        <div>
          {userProfile.posts.map((post) => (
            <div key={post.id}>
              <p>
                <strong>作成日時:</strong> {formatDate(post.created_at)}
              </p>
              <p>
                <strong>投稿内容:</strong> {post.content}
              </p>
              <hr></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
