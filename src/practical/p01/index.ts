// //export function getEdgePosts() {}
// import * as https from 'https'; // 1. Import module สำหรับเรียกใช้ HTTP

// function getEdgePosts(): void {
//   const url = "https://jsonplaceholder.typicode.com/posts"; // ตัวอย่าง URL สำหรับทดสอบ

//   // 2. ใช้ https.get เพื่อส่ง Request ไปยัง Server
//   https.get(url, (res) => {
//     let data = "";

//     // 3. รอรับข้อมูล (ข้อมูลจะค่อยๆ ทยอยส่งมาเป็น 'chunks')
//     res.on("data", (chunk) => {
//       data += chunk;
//     });

//     // 4. เมื่อได้รับข้อมูลจนครบ (End of response)
//     res.on("end", () => {
//       try {
//         // แปลงข้อความ String ให้เป็น JSON Object เพื่อให้แสดงผลสวยงาม
//         const jsonResponse = JSON.parse(data);
//         console.log(jsonResponse);
//       } catch (err) {
//         console.error("Error parsing JSON");
//       }
//     });

//   }).on("error", (err) => {
//     // จัดการกรณีที่เกิดปัญหาด้านเครือข่าย
//     console.log(`Error: ${err.message}`);
//   });
// }

// // ---- เรียกใช้งานฟังก์ชัน ----
// getEdgePosts();
console.log('sadadadad')