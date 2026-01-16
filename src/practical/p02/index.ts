import axios from 'axios';

export const getPostsByUser = async(userId: number) : Promise<any> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;

    // ใช้ .map() เพื่อสร้าง Array ใหม่ที่มีเฉพาะ 'id' และ 'title'
    const filteredData = data.map((item: { id: any; title: any; }) => ({
      id: item.id,
      title: item.title
    }));
    const firstItem = filteredData[0]; 
    const lastItem = filteredData[filteredData.length - 1];

    console.log(firstItem);
    console.log(lastItem);

    const result = [firstItem, lastItem];
    return result.filter(cart => cart.userId === userId);
    } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
}

getPostsByUser(1);