import React, { useState } from 'react';
import { TextField, Button, Card } from '@mui/material';
import './CreateAccount.css';
import { Link } from 'react-router-dom';
import { createUser } from '../../api/api';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    account_name: '',
    mail: '',
    password: '',
    confirmPassword: '',
    error: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = () => {
    const { name, account_name, mail, password, confirmPassword } = formData;
    if (!name || !account_name || !mail || !password || !confirmPassword) {
      setFormData({ ...formData, error: 'すべてのフィールドを入力してください' });
      return;
    }
    if (password !== confirmPassword) {
      setFormData({ ...formData, error: 'パスワードが一致しません' });
      return;
    }
    if (!isValidEmail(mail)) {
      setFormData({ ...formData, error: '有効なメールアドレスを入力してください' });
      return;
    }
    // アカウント作成処理をここに追加
    console.log('Account created:', { name, account_name, mail, password });
    createUser(name, account_name, mail, password);
  };

  //メールアドレスの正規表現
  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  return (
    <div>
      <Card className="create-account-card">
        <div>アカウント作成</div>
        {formData.error && <div className="error-message"><b color="red">{formData.error}</b></div>}
        <TextField
          label="名前"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          label="アカウント名"
          variant="outlined"
          name="account_name"
          value={formData.account_name}
          onChange={handleInputChange}
        />
        <TextField
          label="メールアドレス"
          variant="outlined"
          name="mail"
          value={formData.mail}
          onChange={handleInputChange}
        />
        <TextField
          label="パスワード"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <TextField
          label="パスワード（確認）"
          variant="outlined"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <div className="interval">
          <Button variant="contained" color="primary" onClick={handleCreateAccount}>
            アカウント作成
          </Button>
        </div>
        <div className="interval">
          <Button variant="contained" color="primary" component={Link} to="/login">
            戻る
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateAccount;
