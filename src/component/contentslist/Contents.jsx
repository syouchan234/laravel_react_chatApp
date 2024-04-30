import React, { useEffect, useState } from 'react';
import { Button, IconButton, Menu, MenuItem, CircularProgress, DialogActions, TextField, Dialog, DialogTitle } from '@mui/material';
import { getPostData, pushComment } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faComment, faSyncAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate  } from 'react-router-dom';

const Contents = () => {
  const navigate  = useNavigate ();
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

  // // 投稿idを取得してコメント返信モーダルを立ち上げる
  const [formData, setFormData] = useState({
    post_id: '',
    content: '',
  });
  const [dialogopen, setOpen] = React.useState(false);
  const DialogOpen = (id) => { 
    setFormData({ post_id: id });
    setOpen(true); 
  };
  const DialogClose = () => { setOpen(false); };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const comment = async () => {
    const {post_id, content} = formData;
    if(!content){
      alert("コメントを入力してください");
      return;
    }
    try {
      await pushComment(post_id,content);
      DialogClose();
      fetchData();
    } catch(error) {
      console.error('コメントに失敗しました。', error);
      alert('コメントに失敗しました。もう一度お試しください。');
    }
  }

  // いいね/いいね解除を切り替える処理(未完成)
  const [isLiked, setIsLiked] = useState(false); // いいね済みかどうかを管理するstate
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  //スレッドの表示非表示処理の実装
  const [commentVisible, setCommentVisible] = useState({});
  const toggleCommentVisibility = (postId) => {
    setCommentVisible((prev) => ({
      ...prev,
      [postId]: !prev[postId], // 現在の状態を反転させる
    }));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // アカウントidを取得（相手のプロフィール表示画面の制御実装予定）
  const getAccount_id = (account_id) => {
    navigate(`/profile/${account_id}`);
  }

  return (
    <div>
      <Dialog
        open={dialogopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          返信
        </DialogTitle>
        <TextField
          autoFocus
          required
          margin="dense"
          id="outlined-multiline-static"
          label="投稿内容"
          multiline
          name="content"
          value={formData.content}
          fullWidth
          variant="outlined"
          onChange={handleInputChange}
        />
        <DialogActions>
          <Button onClick={DialogClose}>CANCEL</Button>
          <Button variant="contained" color="primary" onClick={comment}>SEND</Button>
        </DialogActions>
      </Dialog>
      <br></br>
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        <FontAwesomeIcon icon={faSyncAlt} />
      </Button>
      <hr></hr>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="card">
          {data.length === 0 ? (
            <p>まだ投稿がありません。</p>
          ) : (
            data.map((item) => (
              <div key={item.id}>
                <h3 onClick={() => getAccount_id(item.account_id)}>{item.account_name}</h3>
                <p><b>{item.content}</b></p>
                <IconButton onClick={() => DialogOpen(item.id)}>
                  <FontAwesomeIcon icon={faComment} />
                </IconButton>
                <IconButton onClick={handleLike}>
                  <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'gray'} />
                </IconButton>
                <IconButton aria-label="オプション" onClick={handleClick}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton>
                {/* コメントの表示 */}
                {commentVisible[item.id] && item.comments.length > 0 && (
                  <div>
                    <div onClick={() => toggleCommentVisibility(item.id)}>スレッドを非表示</div>
                    {item.comments.map((comment) => (
                      <div key={comment.id}>
                        <p><b>{comment.account_name}</b></p>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
                {!commentVisible[item.id] && item.comments.length > 0 && (
                  <div>
                    <div onClick={() => toggleCommentVisibility(item.id)}>スレッドを表示</div>
                  </div>
                )}
                <hr></hr>
              </div>
            ))
          )}
        </div>
      )}

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Report</MenuItem>
      </Menu>
    </div>
  );
};

export default Contents;
