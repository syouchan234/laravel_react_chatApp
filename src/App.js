//その他ライブラリ等
import { Routes, Route } from "react-router-dom";
import './App.css';

//コンポーネント
import Header from './component/header/Header';

//ページ
import OpenChat from './routes/openchat/OpenChat';
import PrivateChat from './routes/privatechat/PrivateChat';
import DM from './routes/dm/DM';
// import Home from './routes/home/Home';
import Profile from './routes/profile/Profile';
import Login from './routes/login/Login';
import CreateAccount from "./routes/createaccount/CreateAccount";
import EditProfile from "./routes/editprofile/EditProfile";
import Playground from "./component/playground/playground";

// 渡す遷移先の情報を格納
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/openchat" element={<OpenChat />} />
        <Route path="/privatechat" element={<PrivateChat />} />
        <Route path="/dm" element={<DM />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </div>
  );
}

export default App;
