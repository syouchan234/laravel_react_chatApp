import React, { useState } from 'react';
import Contents from '../../component/contentslist/Contents';
import PostForm from '../../component/postForm/PostForm';

const OpenChat = () => {
  const [contentsKey, setContentsKey] = useState(0);
  const handlePostSuccess = () => {
    // 投稿が成功した後に Contents コンポーネントを更新する
    // Contents コンポーネントの key プロパティを変更して再レンダリングをトリガーする
    setContentsKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      {/* <div>OpenChat</div> */}
      <PostForm onPostSuccess={handlePostSuccess} />
      <Contents  key={contentsKey}/>
    </div>
  );
};

export default OpenChat;
