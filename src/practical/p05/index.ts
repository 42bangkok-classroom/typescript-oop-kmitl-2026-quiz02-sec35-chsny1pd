import axios from 'axios';
// กำหนด Interface เพื่อหลีกเลี่ยงการใช้ 'any'
interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface SafedComment {
  id: number;
  body: string;
}

//กำหนดฟังก์ชันแบบ Asynchronous ที่ส่งค่ากลับเป็น Array ของ SimplifiedPost หรือ undefined
export async function safeFetchComment(): Promise<SafedComment[]|null> {
  // ใช้ try เพื่อเริ่มการดักจับข้อผิดพลาด (Error Handling) 
  // หากการทำงานภายในบล็อกนี้มีปัญหา จะกระโดดไปที่ catch ทันที
  try {
    /**
     * 3. สั่งให้โปรแกรม "รอ" (await) การดึงข้อมูลจาก API ผ่าน axios
     * <Post[]> คือการระบุ Generic เพื่อบอกว่าข้อมูลที่ตอบกลับมา (response.data) 
     * จะมีโครงสร้างเป็น Array ของวัตถุ Post
     */
    const response = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments/{id}');
    /**
     * 4. ดึงข้อมูลจริง (Body) ที่ได้จาก API มาเก็บไว้ในตัวแปร posts
     * ซึ่งตัวแปรนี้จะเป็น Array ที่บรรจุโพสต์ทั้งหมด (ปกติจะมี 100 โพสต์)
     */
    const comments = response.data;
    /**
     * 5. ตรวจสอบเงื่อนไขเผื่อไว้ (Guard Clause):
     * ถ้าข้อมูลที่ได้มาเป็น Array ว่างเปล่า (ไม่มีโพสต์เลย) 
     * ให้หยุดการทำงานและส่ง Array เปล่ากลับออกไปทันที
     */
    if (!comments.length) return null;

    // ใช้ Array method (map) เพื่อสร้างอาเรย์ใหม่ที่มีเฉพาะ id และ title
    // หรือจะสร้าง Array ตรงๆ แล้วครอบด้วย map เพื่อดึงเฉพาะ field ที่ต้องการ
    const mapcomments = comments.map((comment) => ({
      id: comment.id,
      body: comment.body
    }))

    return mapcomments

  } catch (error) {
    // จัดการ error ตามความเหมาะสม (ในที่นี้คือ return undefined หรือจะโยน error ต่อก็ได้)
    return null
  }
}