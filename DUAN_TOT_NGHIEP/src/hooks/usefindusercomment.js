import axios from "axios";
import {
    useEffect,
    useState
} from "react";

export const useFindUserComment = (id) => {
    // console.log("user find id CM", id);

    const [recipientUser, setRecipientUser] = useState(null);
    // ở đây có thể hiểu là nó sẽ lấy id người nhắn tin với bạn dựa vào id bạn đăng nhập vào

  useEffect(() => {
//    console.log("user find id CM222", id);
    
      const getUser = async () => {
          if (!id || typeof id !== "string") {
            //   console.error("ID không hợp lệ:", id);
              return;
          }
          try {
              let res = await axios.get(`http://localhost:3000/auth/find/${id}`);
              setRecipientUser(res.data);
          } catch (error) {
              console.error("Lỗi khi gọi API:", error);
          }
      };
      getUser();
  }, [id]);

    return {
        recipientUser
    }
}