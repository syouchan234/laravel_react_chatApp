import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// ログインを行う処理
export const login = async (mail, password) => {
    try {
        const response = await axios.post('http://localhost/api/login', {
            email: mail,
            password: password
        });
        if (response.status === 200) {
            /**
             *  トークンをCookieに保存 httpsリクエスト時のみに走るように設定
             *  本番環境でのみ実装
             */
            // cookies.set('token', response.data.token, { path: '/', secure: true });
            cookies.set('token', response.data.token, { path: '/' }); // トークンをCookieに保存
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            window.location.href = '/openchat'; // 遷移先のURLにリダイレクト
            return true;
        } 
        else if (response.status === 401) {
            errorCheck();
            alert("ログインに失敗しました。");
            return false;
        } 
        else {
            throw new Error('予期せぬエラーが発生しました');
        }
    } catch (error) {
        errorCheck();
        console.error('ログインエラー:', error);
        alert('ログインに失敗しました。' + error.response.statusText);
        return false; // エラーが発生した場合も失敗を示すfalseを返す
    }
};

// ログアウトを行う処理
export const logout = async () => {
    try {
        const token = cookies.get('token'); // Cookieからトークンを取得
        await axios.post('http://localhost/api/logout', null, {
            headers: {
                Authorization: `Bearer ${token}` // トークンをリクエストヘッダーに添付
            }
        });
        cookies.remove('token'); // Cookieからtokenを削除
        // ログアウト後のリダイレクトなどの処理を行う
        window.location.href = '/login'; // ログインページにリダイレクト
    } catch (error){
        errorCheck();
        console.error('ログアウトエラー',error);
        alert('ログアウトに失敗しました'+error.response.statusText);
        window.location.href = '/login';
    }
}

// アカウント作成を行う処理
export const createUser = async (name, account_name, email, password) => {
    try {
        const response = await axios.post('http://localhost/api/createUser', {
            name,
            account_name,
            email,
            password
        });
        /**
         *  トークンをCookieに保存 httpsリクエスト時のみに走るように設定
         *  本番環境でのみ実装
         */
        // cookies.set('token', response.data.token, { path: '/', secure: true });
        cookies.set('token', response.data.token, { path: '/' }); // ブラウザの Cookie ライブラリによって実装する
        window.location.href = '/openchat';
    } catch (error) {
        errorCheck();
        console.error('アカウント作成エラー:', error.response.data);
        throw new Error('アカウントの作成に失敗しました。');
    }
};

// 投稿30件と返信を取得する処理
export const getPostData = async () => {
    try {
        const token = cookies.get('token'); // Cookieからトークンを取得
        const response = await axios.get('http://localhost/api/post', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        } else {
            alert('サーバーエラーが発生しました。');
            throw new Error('サーバーエラーが発生しました。');
        }
    } catch (error) {
        errorCheck();
        alert("エラーが発生しました。ログインページに戻ります。");
        window.location.href = '/login'; // ログインページにリダイレクト
        console.error(error);
        throw error;
    }
};

// ログインユーザーのIDを取得して投稿処理を行う関数
export const pushPost = async (content) => {
    try {
        const testtitle = "title";
        const token = cookies.get('token'); // Cookieからトークンを取得
        const response = await axios.post('http://localhost/api/post', {
            title: testtitle,
            content,
            account_id: getLoggedInUserId() // 認証ユーザーのIDを取得
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 201) {
            const data = response.data;
            return data;
        } else {
            alert('サーバーエラーが発生しました。');
            throw new Error('サーバーエラーが発生しました。');
        }
    } catch (error) {
        errorCheck();
        alert("エラーが発生しました。ログインページに戻ります。");
        console.error(error);
        throw error;
    }
};

// 認証ユーザーのIDを取得する関数
const getLoggedInUserId = () => {
    const user = getUserData(); // ユーザーデータを取得する関数（実装は任意）
    return user ? user.id : null; // ユーザーが存在すればIDを返す
};

// ユーザーデータを取得する関数（実際の実装は任意）
const getUserData = () => {
    // ローカルストレージやCookieからユーザーデータを取得する処理
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
};

// 万が一にエラーが起きた際に対処しておく関数
export const errorCheck = () => {
    cookies.remove('token');// 保持しているトークンを削除
}

/**
 * トークンの取得状況を通知する関数
 * 使用用途：
 * 主に画面の制御などに扱う。
 * また認証が通っていない場合の制御等にも
 */
export const isTokenCheck = () => {return cookies.get('token') ? true : false;}

