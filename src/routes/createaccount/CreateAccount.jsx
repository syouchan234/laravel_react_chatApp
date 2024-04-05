// CreateAccount.js
import React, { useState } from 'react';
import { TextField, Button, Card } from '@mui/material';
import './CreateAccount.css';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    // アカウント作成処理（例: ユーザー名とパスワードの保存）
    console.log('Account created:', { name,accountName,mail,password });
    // ここで必要なアカウント作成のロジックを追加する
  };

  return (
    <div>
      <Card className="create-account-card">
      <div>アカウント作成</div>
        <TextField
          label="名前"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="アカウント名"
          variant="outlined"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <TextField
          label="メールアドレス"
          variant="outlined"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <TextField
          label="パスワード"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="パスワード（確認）"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
