import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getPostData } from '../../api/api';

const Contents = () => {
  const [data, setData] = useState([]); // 一覧を取得するstate
  const [loading, setLoading] = useState(true); // データ取得中の状態を管理するstate

  // データを再取得する関数
  const fetchData = async () => {
    try {
      const result = await getPostData();
      setData(result);
      setLoading(false); // データ取得完了後にloading状態をfalseに設定
    } catch (error) {
      console.error('データの取得に失敗しました', error);
      // エラーハンドリング
      alert('データの取得に失敗しました');
      setLoading(false); // エラーが発生した場合もloading状態をfalseに設定
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
      <h2>～愚民の投稿～</h2>
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        更新する
      </Button>
      <hr></hr>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          {data.length === 0 ? (
            <p>まだ投稿がありません。</p>
          ) : (
            data.map((item) => (
              <div key={item.id}>
                {/* <h3>{item.title}</h3> */}
                <h3>{item.account_name}</h3>
                <p><b>{item.content}</b></p>
                <Button>
                  返信
                </Button>
                <MoreVertIcon/>
                <hr></hr>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Contents;
