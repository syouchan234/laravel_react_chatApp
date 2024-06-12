import { useState } from 'react';
import { createUser } from '../../api/api';

const useCreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    account_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    account_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    form: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = () => {
    const { name, account_name, email, password, confirmPassword } = formData;
    let newErrors = { name: '', account_name: '', email: '', password: '', confirmPassword: '', form: '' };

    if (!name) newErrors.name = '名前を入力してください';
    if (name.length > 30) newErrors.name = '名前は30文字以内で入力してください';
    if (!account_name) newErrors.account_name = 'アカウント名を入力してください';
    if (account_name.length > 30) newErrors.account_name = 'アカウント名は30文字以内で入力してください';
    if (!email) newErrors.email = 'メールアドレスを入力してください';
    if (!isValidEmail(email)) newErrors.email = '有効なメールアドレスを入力してください';
    if (!password) newErrors.password = 'パスワードを入力してください';
    if (password.length < 6) newErrors.password = 'パスワードは6文字以上で入力してください';
    if (!confirmPassword) newErrors.confirmPassword = '確認用パスワードを入力してください';
    if (password !== confirmPassword) newErrors.confirmPassword = 'パスワードが一致しません';

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);
    setIsLoading(true);

    createUser(name, account_name, email, password);
  };

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleCreateAccount
  };
};

export default useCreateAccount;
