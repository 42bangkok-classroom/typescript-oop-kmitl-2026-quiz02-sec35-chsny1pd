// import axios from 'axios';

// export async function getPostsByUser(userId: number) {
//   const url = 'https://jsonplaceholder.typicode.com/posts';

//   try {
//     // 1. ดึงข้อมูลจาก API ด้วย axios
//     const response = await axios.get(url);
//     const allPosts = response.data;

//     // 2. ใช้ Array Method (.filter และ .map) เพื่อเลือกเฉพาะข้อมูลที่ต้องการ
//     // กรองเอาเฉพาะ userId ที่ตรงกัน และเลือกส่งกลับแค่ id กับ title
//     const filteredPosts = allPosts
//       .filter((post: { userId: any; }) => post.userId === userId)
//       .map((post: { id: any; title: any; }) => ({
//         id: post.id,
//         title: post.title,
//       }));

//     // 3. Return ค่าออกไป (ตามโจทย์ระบุว่าถ้าไม่เจอให้เป็น array ว่าง ซึ่ง filter จัดการให้แล้ว)
//     return filteredPosts;

//   } catch (error) {
//     // จัดการ Error (ส่งค่ากลับเป็น array ว่าง หรือจัดการตามความเหมาะสม)
//     return [];
//   }
// }

import axios from 'axios';

// กำหนด Interface เพื่อหลีกเลี่ยงการใช้ 'any'
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface FilteredPost {
  id: number;
  title: string;
}

//กำหนดฟังก์ชันแบบ Asynchronous ที่ส่งค่ากลับเป็น Array ของ SimplifiedPost หรือ undefined
async function getPostsByUser(userId: number): Promise<FilteredPost[] | undefined> {
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

    // ใช้ Array method (filter) เพื่อกรองหาอาเรย์ที่ มี userID ตรงกัน
    const filteredPosts = posts.filter((post) => post.userId === userId)

    // ใช้ Array method (map) เพื่อสร้างอาเรย์ใหม่ที่มีเฉพาะ id และ title
    // หรือจะสร้าง Array ตรงๆ แล้วครอบด้วย map เพื่อดึงเฉพาะ field ที่ต้องการ
    return filteredPosts.map(({ id, title }) => ({
      id,
      title
    }));

  } catch (error) {
    // จัดการ error ตามความเหมาะสม (ในที่นี้คือ return undefined หรือจะโยน error ต่อก็ได้)
    return undefined;
  }
}

getPostsByUser(50)
