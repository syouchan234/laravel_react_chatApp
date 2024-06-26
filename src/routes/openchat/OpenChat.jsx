import React, { useState } from 'react';
import Contents from '../../component/contentslist/Contents';
import PostForm from '../../component/postForm/PostForm';

const OpenChat = () => {
  const [contentsKey, setContentsKey] = useState(0);
  const handlePostSuccess = () => {
    // 投稿・リプライの投稿が成功した後にContentsコンポーネントを更新する
    // Contents コンポーネントの key プロパティを変更して再レンダリングをトリガーして
    // 最新の投稿情報を取得する
    setContentsKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <PostForm onPostSuccess={handlePostSuccess} />
      <Contents key={contentsKey} />
    </div>
  );
};

export default OpenChat;
