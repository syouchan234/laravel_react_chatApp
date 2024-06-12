import React, { useState } from 'react';
import { Button, TextField, Card, FormControl, 
  InputLabel, Select, MenuItem } from '@mui/material';
import { updateUserProfile } from '../../api/api';
import { Link } from 'react-router-dom';

export const editProfileInf = (account_name,birthday,gender,place,introduction) => {
  console.log(account_name,birthday,gender,place,introduction);
}

const EditProfile = () => {
  const [formData, setFormData] = useState({
    account_name: '',
    year: '',
    month: '',
    day: '',
    gender: '',
    place: '',
    introduction: '',
    error: ''
  });

  const [formValidity, setFormValidity] = useState({
    year: false,
    month: false,
    day: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 入力がある場合は対応するフォームの有効化を更新
    if (name === 'year') {
      setFormValidity({ ...formValidity, month: true });
    } else if (name === 'month') {
      setFormValidity({ ...formValidity, day: true });
    }
  };

  const handleUpdateProfile = () => {
    const { account_name, year, month, day, gender, place, introduction } = formData;
    if (!account_name) {
      setFormData({ ...formData, error: 'アカウント名は必須だ' });
      return;
    }
    const birthday = `${year}/${month}/${day}`;
    console.log('profile update:', { account_name, birthday, gender, place, introduction });
    // ここにAPIの処理を追加
    updateUserProfile(account_name,birthday,gender,place,introduction);
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); // 現在の年を取得

  const createOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return options;
  };

  // 年の選択肢を作成（現在の年から過去100年間）
  const yearOptions = createOptions(currentYear - 100, currentYear);

  // 月の選択肢を作成（1から12）
  const monthOptions = createOptions(1, 12);

  // 日の選択肢を作成
  const updateDayOptions = (selectedYear, selectedMonth) => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate(); // 指定された年月の日数を取得
    const dayOptions = createOptions(1, daysInMonth);
    return dayOptions;
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setFormData({ ...formData, year: selectedYear });

    // 年が入力されたら月のフォームを有効化
    setFormValidity({ ...formValidity, month: true });
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setFormData({ ...formData, month: selectedMonth });

    // 月が入力されたら日のフォームを有効化
    setFormValidity({ ...formValidity, day: true });
  };

  return (
    <div>
      <Card className="create-account-card">
        <div><b>プロフィールの編集</b></div>
        {formData.error && <div className="error-message">{formData.error}</div>}
        <TextField
          label="アカウント名"
          variant="outlined"
          name="account_name"
          value={formData.account_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="gender-label">性別</InputLabel>
          <Select
            labelId="gender-label"
            value={formData.gender}
            onChange={handleInputChange}
            label="性別"
            name="gender"
          >
            <MenuItem value="男">男</MenuItem>
            <MenuItem value="女">女</MenuItem>
            <MenuItem value="その他">その他</MenuItem>
          </Select>
        </FormControl>
        <div>誕生日</div>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="year-label">年</InputLabel>
          <Select
            labelId="year-label"
            value={formData.year}
            onChange={handleYearChange}
            label="年"
            name="year"
          >
            {yearOptions}
          </Select>
        </FormControl>
        <div>/</div>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="month-label">月</InputLabel>
          <Select
            labelId="month-label"
            value={formData.month}
            onChange={handleMonthChange}
            label="月"
            name="month"
            disabled={!formValidity.month} // monthが有効でない場合は無効化
          >
            {monthOptions}
          </Select>
        </FormControl>
        <div>/</div>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="day-label">日</InputLabel>
          <Select
            labelId="day-label"
            value={formData.day}
            onChange={handleInputChange}
            label="日"
            name="day"
            disabled={!formValidity.day} // dayが有効でない場合は無効化
          >
            {updateDayOptions(formData.year, formData.month)}
          </Select>
        </FormControl>

        <TextField
          label="場所"
          variant="outlined"
          name="place"
          value={formData.place}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="自己紹介"
          variant="outlined"
          name="introduction"
          value={formData.introduction}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <div className="interval">
          <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
            保存
          </Button>
        </div>
        <div className="interval">
          <Button variant="contained" color="primary" component={Link} to="/profile">
            戻る
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditProfile;