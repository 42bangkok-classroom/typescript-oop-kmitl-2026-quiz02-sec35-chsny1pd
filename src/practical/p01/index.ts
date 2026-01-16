
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

// import axios from 'axios';

// export const getEdgePosts = async() : Promise<any[]> => {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     const data = response.data;

//     // ใช้ .map() เพื่อสร้าง Array ใหม่ที่มีเฉพาะ 'id' และ 'title'
//     const filteredData = data.map((item: { id: any; title: any; }) => ({
//       id: item.id,
//       title: item.title
//     }));

//     console.log(filteredData);
//     // ผลลัพธ์:
//     // [
//     //   { id: 1, title: 'delectus aut autem' },
//     // L  { id: 2, title: 'quis ut nam facilis et officia qui' }
//     // ]
//     return response.data;
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาด:", error);
//   }
// }

// getEdgePosts();

import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/posts'; // ตัวอย่าง API

axios.get(url, {
    params: {
        // ถ้า API รองรับการจำกัดฟิลด์:
        // _fields: 'id,title', // อาจใช้ชื่ออื่น เช่น 'fields', 'select' ขึ้นอยู่กับ API
    }
})
.then(response => {
    const data = response.data; // ข้อมูลทั้งหมดที่ได้รับมา
    //console.log("ข้อมูลทั้งหมด:", data);
    // ต่อจากโค้ดด้านบน เมื่อได้ response.data มาแล้ว
const allData = response.data;

// 1. กรองให้เหลือแค่ id กับ title
const filteredData = allData.map((item: { id: any; title: any; }) => ({
    id: item.id,
    title: item.title
}));

// 2. เลือกข้อมูล ID แรก และ ID สุดท้าย
const firstItem = filteredData[0]; // ตัวแรก
const lastItem = filteredData[filteredData.length - 1]; // ตัวสุดท้าย

console.log(firstItem);
console.log(lastItem);

// ถ้าต้องการแค่ข้อมูล id กับ title ของตัวแรกและตัวสุดท้าย
const result = [firstItem, lastItem];
//console.log("ผลลัพธ์ที่ต้องการ:", result);
})
.catch(error => {
    console.error("เกิดข้อผิดพลาด:", error);
});