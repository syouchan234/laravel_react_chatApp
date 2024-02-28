import React,{ memo } from 'react'
import Contents from '../../component/contentslist/Contents'

export const Home = memo(() => {
  return (
    <div>
      <div>Home</div>
      <Contents />
    </div>
  )
});

export default Home