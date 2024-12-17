import axios from "axios";
import {
    // useContext,
    useEffect,
    useState
} from "react";
// import {
//     Message_context
// } from "../context/MessageContext";

export const useFindTour = (id) => {
    const [recipientTour, setRecipientTour] = useState(null);
    // ở đây có thể hiểu là nó sẽ lấy id người nhắn tin với bạn dựa vào id bạn đăng nhập vào

    useEffect(() => {
        const getTour = async () => {
            if (!id) {
                return;
            }
            // phần này sử lý api , load user dựa vào id
            let res = await axios.get(`http://localhost:3000/Admin/tours/detail/${id}`)
            setRecipientTour(res.data)
        }
        getTour()
    }, [id]) //newMessage

    return {
        recipientTour
    }
}