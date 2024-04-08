import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getPostData } from "../../api/api";

export const Contents = () => {
  const [data, setData] = useState([]); // 一覧を取得するstate
  useEffect(() => {
    // コンポーネントがマウントされたときに投稿一覧を保持する
    const getPostDataList = async () => {
      try {
        const result = await getPostData();
        setData(result);
      } catch (error) {
        // エラーハンドリング
        console.error("データの取得に失敗しました", error);
      }
    };

    getPostDataList(); // データの取得処理を走らせる。
  }, []); // 第2引数の空の配列はマウント時に1度だけ実行されることを示します

  return (
    <div>
      <h2>Data List</h2>
      <div className="card">
        {data.map((item) => (
          <div key={item.id}>
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
