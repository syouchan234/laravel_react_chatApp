export const fetchData = async () => {
    try {
        const response = await fetch('http://localhost/api/toDos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};