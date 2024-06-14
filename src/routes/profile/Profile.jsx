import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '../../muiImports';
import { Link } from 'react-router-dom';
import useProfile from './useProfile';
import { editProfileInf } from '../editprofile/EditProfile';;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const MyPage = () => {
  const {
    userProfile,
    isOwnProfile,
    logoutDialog,
    setLogoutDialog,
    accountDeleteConfirmDialog,
    setAccountDeleteConfirmDialog,
    handleLogout,
    deleteAccount
  } = useProfile();

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
        <DialogTitle id="alert-dialog-title">ログアウトしてもええか？</DialogTitle>
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
        <DialogTitle id="alert-dialog-title">アカウント消えてまうで？</DialogTitle>
        <DialogActions>
          <Button onClick={() => setAccountDeleteConfirmDialog(false)}>やめいや</Button>
          <Button onClick={deleteAccount}>ええで</Button>
        </DialogActions>
      </Dialog>

      <br />
      <b>投稿一覧</b>
      <hr />
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
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
