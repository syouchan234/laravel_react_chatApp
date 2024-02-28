import React, { useEffect, useState } from 'react'
import { fetchData } from "../../api/api";

export const Contents = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const result = await fetchData();
        setData(result);
        console.log(result);
      } catch (error) {
        // エラーハンドリング
        console.log("おのれ、アボカド帝国の仕業かっ！");
      }
    };

    fetchDataList();
  }, []);
  return (
    <div>
      <h2>Data List</h2>
      <div class="card">
        {data.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  )
}

export default Contents