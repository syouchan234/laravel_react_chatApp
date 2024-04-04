import axios from 'axios';

// ログインを行う処理
export const login = async (mail, password) => {
    axios.post('http://localhost/api/login', {
        email: mail,
        password: password
    })
    // ログイン成功時の処理
    .then(response => {
        if(response.status === 200){
            console.log("トークン："+response.data.token);
            alert('フロント：ログインに成功しました');// ログイン成功をユーザーに通知
            window.location.href = '/openchat'; // 遷移先のURLにリダイレクト
        } else if(response.status === 401) alert("サーバー:" + response.error);// 認証失敗時  
        else alert("フロント：予期せぬエラーが発生してしまいました。");
    })
    // ログイン失敗時の処理
    .catch(error => {
        console.error('ログインエラー:', error);
        alert('ログインに失敗しました。'+ error.response.statusText);
    });
}

export const fetchData = async () => {
    try {
        const response = await fetch('http://localhost/api/post');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};