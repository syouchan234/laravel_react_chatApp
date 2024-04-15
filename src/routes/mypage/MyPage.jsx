import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { logout, getUserProfile } from '../../api/api';

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

  return (
    <div>
      <b>アカウント情報</b>
      {userProfile && (
        <div>
          <p>ユーザー名: {userProfile.accounts.name}</p>
          <p>アカウント名: {userProfile.accounts.account_name}</p>
          <p>メールアドレス: {userProfile.accounts.email}</p>
          <p>登録日時: {formatDate(userProfile.accounts.created_at)}</p>
          <p>更新日時: {formatDate(userProfile.accounts.updated_at)}</p>
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handleLogout}>
        ログアウト
      </Button>
      <Button variant="contained" color="primary">
        情報の変更
      </Button>
    </div>
  );
};

export default MyPage;
