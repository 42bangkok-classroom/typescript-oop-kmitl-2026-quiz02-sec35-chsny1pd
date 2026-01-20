import axios from 'axios';

// กำหนด Interface เพื่อหลีกเลี่ยงการใช้ 'any'
interface Post {
  id: number;
  title: string;
}

interface Comment {
  postId: number;
  id: number;
}

interface PostWithCount {
  postId: number;
  title: string;
  totalComments: number;
}

//กำหนดฟังก์ชันแบบ Asynchronous ที่ส่งค่ากลับเป็น Array ของ SimplifiedPost หรือ undefined
export async function mapPostWithCommentCoun(): Promise<PostWithCount[]> {
  // ใช้ try เพื่อเริ่มการดักจับข้อผิดพลาด (Error Handling) 
  // หากการทำงานภายในบล็อกนี้มีปัญหา จะกระโดดไปที่ catch ทันที
  try {
    /**
     * 3. สั่งให้โปรแกรม "รอ" (await) การดึงข้อมูลจาก API ผ่าน axios
     * <Post[]> <Comment[]> คือการระบุ Generic เพื่อบอกว่าข้อมูลที่ตอบกลับมา (postres.data) , (commentres.data)
     * จะมีโครงสร้างเป็น Array ของวัตถุ Post
     */
    const postres = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    const commentres = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments');
    /**
     * 4. ดึงข้อมูลจริง (Body) ที่ได้จาก API มาเก็บไว้ในตัวแปร posts , comments
     * ซึ่งตัวแปรนี้จะเป็น Array ที่บรรจุโพสต์ทั้งหมด (ปกติจะมี 100 โพสต์)
     */
    const posts = postres.data;
    const comments = commentres.data;
    /**
     * 5. ตรวจสอบเงื่อนไขเผื่อไว้ (Guard Clause):
     * ถ้าข้อมูลที่ได้มาเป็น Array ว่างเปล่า (ไม่มีโพสต์เลย) 
     * ให้หยุดการทำงานและส่ง Array เปล่ากลับออกไปทันที
     */
    if (!posts.length||!comments.length) return [];

    // คืนค่าที่โจทย์ต้องการ
    return posts.map((post) => { 
    // ใช้ Array method (map) เพื่อสร้างอาเรย์ใหม่ของ comment ที่มี postId เหมือนกัน จะได้นับจำนวนง่าย
    const CommentedPosts = comments.filter((comment) => comment.postId === post.id)
    return {
     postId: post.id,
     title: post.title,
     totalComments: CommentedPosts.length
    };
    });
  
  } catch (error) {
    // จัดการ error ตามความเหมาะสม (ในที่นี้คือ return undefined หรือจะโยน error ต่อก็ได้)
    return [];
  }
}
