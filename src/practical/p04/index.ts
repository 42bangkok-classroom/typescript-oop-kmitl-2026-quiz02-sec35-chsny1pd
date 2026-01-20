import axios from 'axios';

// กำหนด Interface เพื่อหลีกเลี่ยงการใช้ 'any'
interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
// กำหนดโครงสร้างผลลัพธ์: Key เป็นตัวเลข (Post ID) และ Value เป็นตัวเลข (จำนวน)
interface CommentCountMap {
  [postId: number]: number;
}

/**
 * ฟังก์ชันนับจำนวนคอมเมนต์แยกตามแต่ละโพสต์
 * คืนค่าเป็น Object ที่มีรูปแบบ { postId: count }
 */

//กำหนดฟังก์ชันแบบ Asynchronous ที่ส่งค่ากลับเป็น Array ของ SimplifiedPost หรือ undefined
export async function countCommentsByPost(): Promise<CommentCountMap> {
  // ใช้ try เพื่อเริ่มการดักจับข้อผิดพลาด (Error Handling) 
  // หากการทำงานภายในบล็อกนี้มีปัญหา จะกระโดดไปที่ catch ทันที
  try {
    /**
     * 3. สั่งให้โปรแกรม "รอ" (await) การดึงข้อมูลจาก API ผ่าน axios
     * <Comment[]> คือการระบุ Generic เพื่อบอกว่าข้อมูลที่ตอบกลับมา , (commentres.data)
     * จะมีโครงสร้างเป็น Array ของวัตถุ Post
     */
    const response = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments');
    /**
     * 4. ดึงข้อมูลจริง (Body) ที่ได้จาก API มาเก็บไว้ในตัวแปร posts , comments
     * ซึ่งตัวแปรนี้จะเป็น Array ที่บรรจุโพสต์ทั้งหมด (ปกติจะมี 100 โพสต์)
     */
    const comments = response.data;
    /**
     * 5. ตรวจสอบเงื่อนไขเผื่อไว้ (Guard Clause):
     * ถ้าข้อมูลที่ได้มาเป็น Array ว่างเปล่า (ไม่มีโพสต์เลย) 
     * ให้หยุดการทำงานและส่ง Array เปล่ากลับออกไปทันที
     */
    if (!comments.length) return {};

    /**
     * ใช้ .reduce() เพื่อยุบรวมอาเรย์คอมเมนต์ให้กลายเป็น Object เพียงอันเดียว
     * acc (accumulator): คือ Object ผลลัพธ์ที่เรากำลังค่อยๆ สร้างขึ้น
     * comment: คือข้อมูลคอมเมนต์แต่ละตัวที่กำลังถูกตรวจสอบ
     */
  
    return comments.reduce((acc: CommentCountMap, comment) => {
      const postId = comment.postId;

      // 6. Edge Case: ตรวจสอบค่า null หรือ undefined ของ postId ตามโจทย์
      // หากพบข้อมูลที่ไม่สมบูรณ์ ให้ข้ามไป (return acc เดิมกลับไป)
      if (postId === null || postId === undefined) {
        return acc;
      }

      /**
       * 7. ตรรกะการนับ (Counting Logic):
       * - หากใน acc ยังไม่มี Key นี้ (postId) ให้เริ่มนับที่ 1
       * - หากมีอยู่แล้ว ให้ดึงค่าเดิมออกมาบวกเพิ่มอีก 1
       */
      acc[postId] = (acc[postId] || 0) + 1;
      
      return acc;
    }, {}); // เริ่มต้นด้วย Object ว่าง {}
  } catch (error) {
    // จัดการ error ตามความเหมาะสม (ในที่นี้คือ return undefined หรือจะโยน error ต่อก็ได้)
    return [];
  }
}

const run = async () => {
  const result = await countCommentsByPost();
  console.log(result);
};

run();

