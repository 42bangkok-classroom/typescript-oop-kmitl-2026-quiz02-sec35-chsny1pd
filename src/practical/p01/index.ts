
// export const url = "https://jsonplaceholder.typicode.com/posts"
// import axios from 'axios';
// export const getEdgePosts = async (): Promise<any[]> => {
//     try {
//         const response = await axios.get(url);
//         return response.data;
//     } catch (error) {
//         throw new Error('Failed to fetch products');
//     }
// };

import axios from 'axios';

async function getEdgePosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;

    // ใช้ .map() เพื่อสร้าง Array ใหม่ที่มีเฉพาะ 'id' และ 'title'
    const filteredData = data.map((item: { id: any; title: any; }) => ({
      id: item.id,
      title: item.title
    }));

    console.log(filteredData);
    // ผลลัพธ์:
    // [
    //   { id: 1, title: 'delectus aut autem' },
    // L  { id: 2, title: 'quis ut nam facilis et officia qui' }
    // ]

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
}

getEdgePosts();