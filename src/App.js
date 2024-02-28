//その他ライブラリ等
import { Routes, Route } from "react-router-dom";
import './App.css';

//コンポーネント
import Header from './component/header/Header';

//ページ
import OpenChat from './routes/openchat/OpenChat';
import PrivateChat from './routes/privatechat/PrivateChat';
import PublicChat from './routes/publicchat/PublicChat';
import Home from './routes/home/Home';
import MyPage from './routes/mypage/MyPage';
import Login from './routes/login/Login';
import CreateAccount from "./routes/createaccount/CreateAccount";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/openchat" element={ <OpenChat /> } />
        <Route path="/privatechat" element={ <PrivateChat /> } />
        <Route path="/publicchat" element={ <PublicChat /> } />
        <Route path="/mypage" element={ <MyPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/createaccount" element={ <CreateAccount /> } />
      </Routes>
    </div>
  );
}

export default App;
