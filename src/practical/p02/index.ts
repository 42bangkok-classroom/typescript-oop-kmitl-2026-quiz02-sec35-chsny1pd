import axios from 'axios';

export async function getPostsByUser(userId: number) {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  try {
    // 1. ดึงข้อมูลจาก API ด้วย axios
    const response = await axios.get(url);
    const allPosts = response.data;

    // 2. ใช้ Array Method (.filter และ .map) เพื่อเลือกเฉพาะข้อมูลที่ต้องการ
    // กรองเอาเฉพาะ userId ที่ตรงกัน และเลือกส่งกลับแค่ id กับ title
    const filteredPosts = allPosts
      .filter((post: { userId: any; }) => post.userId === userId)
      .map((post: { id: any; title: any; }) => ({
        id: post.id,
        title: post.title,
      }));

    // 3. Return ค่าออกไป (ตามโจทย์ระบุว่าถ้าไม่เจอให้เป็น array ว่าง ซึ่ง filter จัดการให้แล้ว)
    return filteredPosts;

  } catch (error) {
    // จัดการ Error (ส่งค่ากลับเป็น array ว่าง หรือจัดการตามความเหมาะสม)
    return [];
  }
}
