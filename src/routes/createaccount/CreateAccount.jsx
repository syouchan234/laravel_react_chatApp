import React from 'react';
import { TextField, Button, Card, CircularProgress } from '../../muiImports';
import './CreateAccount.css';
import { Link } from 'react-router-dom';
import useCreateAccount from './useCreateAccount';

const CreateAccount = () => {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleCreateAccount
  } = useCreateAccount();

  return (
    <div>
      <Card className="create-account-card">
        <div>アカウント作成</div>
        {errors.form && <div className="error-message"><b style={{ color: 'red' }}>{errors.form}</b></div>}
        <div>
          {errors.name && <div className="error-message"><b style={{ color: 'red' }}>{errors.name}</b></div>}
          <TextField
            label="名前"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {errors.account_name && <div className="error-message"><b style={{ color: 'red' }}>{errors.account_name}</b></div>}
          <TextField
            label="アカウント名"
            variant="outlined"
            name="account_name"
            value={formData.account_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {errors.email && <div className="error-message"><b style={{ color: 'red' }}>{errors.email}</b></div>}
          <TextField
            label="メールアドレス"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {errors.password && <div className="error-message"><b style={{ color: 'red' }}>{errors.password}</b></div>}
          <TextField
            label="パスワード"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {errors.confirmPassword && <div className="error-message"><b style={{ color: 'red' }}>{errors.confirmPassword}</b></div>}
          <TextField
            label="パスワード（確認）"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="interval">
          <Button variant="contained" color="primary" onClick={handleCreateAccount} disabled={isLoading}>
            アカウント作成
          </Button>
        </div>
        {isLoading && <CircularProgress />}
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
