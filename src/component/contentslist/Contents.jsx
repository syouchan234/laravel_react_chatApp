import React, { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { getPostData, pushComment } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faComment, faSyncAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

const Contents = () => {
  const [data, setData] = useState([]); // 一覧を取得するstate
  const [loading, setLoading] = useState(true); // データ取得中の状態を管理するstate

  // データを再取得する関数
  const fetchData = async () => {
    try {
      const result = await getPostData();
      setData(result);
      setLoading(false); // データ取得完了後にloading状態をfalseに設定
      console.log(result);
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

  const comment = () => {
    const postId = 1;
    const content = "返信テスト"
    pushComment(postId, content);
  }
  
  const [isLiked, setIsLiked] = useState(false); // いいね済みかどうかを管理するstate
  const handleLike = () => {
    setIsLiked(!isLiked); // いいね/いいね解除を切り替える
  };

  return (
    <div>
      <br></br>
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        <FontAwesomeIcon icon={faSyncAlt} />
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
                <h3>{item.account_name}</h3>
                <p><b>{item.content}</b></p>
                <IconButton onClick={comment}>
                  <FontAwesomeIcon icon={faComment} />
                </IconButton>
                <IconButton onClick={handleLike}>
                  <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'gray'} />
                </IconButton>
                <IconButton aria-label="オプション">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton>
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
