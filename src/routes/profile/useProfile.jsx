// src/hooks/useUserProfile.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, logout, deleteUser } from '../../api/api';

const useProfile = () => {
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

  const handleLogout = async () => {
    try {
      await logout();
      // ログアウト後の処理を追加
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteUser();
      // アカウント削除後の処理を追加
    } catch (error) {
      console.error('Account deletion error:', error);
    }
  };

  return {
    userProfile,
    isOwnProfile,
    logoutDialog,
    setLogoutDialog,
    accountDeleteConfirmDialog,
    setAccountDeleteConfirmDialog,
    handleLogout,
    deleteAccount
  };
};

export default useProfile;
