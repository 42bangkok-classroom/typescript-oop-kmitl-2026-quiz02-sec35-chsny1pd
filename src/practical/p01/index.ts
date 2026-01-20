// import axios from 'axios';

// export const getEdgePosts = async() : Promise<any> => {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     const data = response.data;

//     // ใช้ .map() เพื่อสร้าง Array ใหม่ที่มีเฉพาะ 'id' และ 'title'
//     const filteredData = data.map((item: { id: any; title: any; }) => ({
//       id: item.id,
//       title: item.title
//     }));
//     const firstItem = filteredData[0]; 
//     const lastItem = filteredData[filteredData.length - 1];

//     console.log(firstItem);
//     console.log(lastItem);

//     const result = [firstItem, lastItem];
//     return result;
//     } catch (error) {
//     console.error("เกิดข้อผิดพลาด:", error);
//   }
// }

// getEdgePosts();

import axios from 'axios';

// กำหนด Interface เพื่อหลีกเลี่ยงการใช้ 'any'
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface SimplifiedPost {
  id: number;
  title: string;
}

//กำหนดฟังก์ชันแบบ Asynchronous ที่ส่งค่ากลับเป็น Array ของ SimplifiedPost หรือ undefined
export async function getEdgePosts(): Promise<SimplifiedPost[] | undefined> {
  // ใช้ try เพื่อเริ่มการดักจับข้อผิดพลาด (Error Handling) 
  // หากการทำงานภายในบล็อกนี้มีปัญหา จะกระโดดไปที่ catch ทันที
  try {
    /**
     * 3. สั่งให้โปรแกรม "รอ" (await) การดึงข้อมูลจาก API ผ่าน axios
     * <Post[]> คือการระบุ Generic เพื่อบอกว่าข้อมูลที่ตอบกลับมา (response.data) 
     * จะมีโครงสร้างเป็น Array ของวัตถุ Post
     */
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    /**
     * 4. ดึงข้อมูลจริง (Body) ที่ได้จาก API มาเก็บไว้ในตัวแปร posts
     * ซึ่งตัวแปรนี้จะเป็น Array ที่บรรจุโพสต์ทั้งหมด (ปกติจะมี 100 โพสต์)
     */
    const posts = response.data;
    /**
     * 5. ตรวจสอบเงื่อนไขเผื่อไว้ (Guard Clause):
     * ถ้าข้อมูลที่ได้มาเป็น Array ว่างเปล่า (ไม่มีโพสต์เลย) 
     * ให้หยุดการทำงานและส่ง Array เปล่ากลับออกไปทันที
     */
    if (posts.length === 0) return [];

    // เลือกตัวแรกและตัวสุดท้าย
    const firstPost = posts[0];
    const lastPost = posts[posts.length - 1];

    // ใช้ Array method (map) เพื่อสร้างอาเรย์ใหม่ที่มีเฉพาะ id และ title
    // หรือจะสร้าง Array ตรงๆ แล้วครอบด้วย map เพื่อดึงเฉพาะ field ที่ต้องการ
    return  [firstPost, lastPost].map(({ id, title }) => ({
      id,
      title
    }));

  } catch (error) {
    // จัดการ error ตามความเหมาะสม (ในที่นี้คือ return undefined หรือจะโยน error ต่อก็ได้)
    return undefined;
  }
}

//เพื่อไม่ให้ติด Pending 
const run = async () => {
  const result = await getEdgePosts();
  console.log(result);
};

run();