import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getPostData } from '../../api/api';

const Contents = () => {
  const [data, setData] = useState([]); // 一覧を取得する state

  // データを再取得する関数
  const fetchData = async () => {
    try {
      const result = await getPostData();
      setData(result);
    } catch (error) {
      console.error('データの取得に失敗しました', error);
      // エラーハンドリング
      alert('データの取得に失敗しました');
    }
  };

  // 初回マウント時と更新ボタンクリック時にデータを取得
  useEffect(() => {
    fetchData(); // データの取得処理を走らせる。
  }, []); // 第2引数の空の配列はマウント時に1度だけ実行されることを示します

  // 更新ボタンがクリックされたときにデータを再取得
  const handleRefresh = () => {
    fetchData(); // データの再取得
  };

  return (
    <div>
      <h2>Data List</h2>
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        更新する
      </Button>
      <div className="card">
        {data.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <Button variant="contained" color="primary">
              返信
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
