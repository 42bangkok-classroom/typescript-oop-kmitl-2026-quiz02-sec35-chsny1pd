// // interface Data {
// //   id: number;
// //   title: string;
// // }


// // import * as https from 'https'; // 1. Import module สำหรับเรียกใช้ HTTP

// // export function getEdgePosts(): any {
// //   const url = "https://jsonplaceholder.typicode.com/posts"; // ตัวอย่าง URL สำหรับทดสอบ

// //   // 2. ใช้ https.get เพื่อส่ง Request ไปยัง Server
// //   https.get(url, (res) => {
// //     let data = "";

// //     // 3. รอรับข้อมูล (ข้อมูลจะค่อยๆ ทยอยส่งมาเป็น 'chunks')
// //     res.on("data", (chunk) => {
// //            data += chunk;
// //     });

// //     // 4. เมื่อได้รับข้อมูลจนครบ (End of response)
// //     res.on("end", () => {
// //       try {
// //         // แปลงข้อความ String ให้เป็น JSON Object เพื่อให้แสดงผลสวยงาม
// //         const jsonResponse = JSON.parse(data);
// //         console.log(jsonResponse);
// //       } catch (err) {
// //         console.error("Error parsing JSON");
// //       }
// //     });

// //   }).on("error", (err) => {
// //     // จัดการกรณีที่เกิดปัญหาด้านเครือข่าย
// //     console.log(`Error: ${err.message}`);
// //   });
// // }

// // // ---- เรียกใช้งานฟังก์ชัน ----
// // getEdgePosts();

// // interface ItemData {
// //   id: number;
// //   title: string;
// // }

// // async function getEdgePosts(item: ItemData) {
// //   try {
// //     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
// //       method: 'POST', // ใช้ POST เพื่อสร้าง
// //       headers: {
// //         'Content-Type': 'application/json', // บอกว่าเราส่ง JSON
// //       },
// //       body: JSON.stringify(item), // แปลง object เป็น JSON string
// //     });

// //     if (!response.ok) {
// //       throw new Error(`HTTP error! status: ${response.status}`);
// //     }

// //     const data = await response.json();
// //     console.log(data);
// //   } catch (error) {
// //     console.error('Error:', error);
// //   }
// //   return 
// // }

// // // ตัวอย่างการเรียกใช้
// // getEdgePosts({ id: 1, title: 'สินค้าตัวใหม่' });
// import https from "https";

// https.get("https://jsonplaceholder.typicode.com/posts", res => {
// 	let data = "";

//   res.on("data", chunk => {
//     data += chunk;
//   });

//   res.on("end", () => {
// 		console.log(data);
//   });
// }).on("error", err => {
// 	console.error("Request error:", err.message);
// });

// function request(url:string): Promise<string> {
// 	return new Promise((resolve, reject) => {
// 	  https.get(url,res => {
// 			let data ="";
// 	    res.on("data", c => data += c);
// 	    res.on("end", () => resolve(data));
// 	  }).on("error", reject);
// 	});
// }

// // async function loadPost() {
// // 	try {
// // 		const url = "https://jsonplaceholder.typicode.com/posts"
// // 		const data = await request(url);
// // 		console.log(data);
// // 	} catch (err) {
// // 			console.error("HTTP failed:", err);
// // 	}
// // }
export const url = "https://jsonplaceholder.typicode.com/posts"
import axios from 'axios';
export const getEdgePosts = async (): Promise<any[]> => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
};