export const fetchData = async () => {
    //API一覧
    //ToDo一覧の取得
    //http://localhost/api/toDos
    //投稿一覧の取得
    //http://localhost/api/post
    try {
        const response = await fetch('http://localhost/api/post');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};