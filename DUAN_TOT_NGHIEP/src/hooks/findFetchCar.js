import axios from "axios";
import {
    useEffect,
    useState
} from "react";


export const useFindCar = (id) => {
  console.log("xe",id);
    const [recipientCar, setRecipientCar] = useState(null);


    useEffect(() => {
        const getCar = async () => {
            if (!id) {
                return;
            }
            // phần này sử lý api , load user dựa vào id
            let res = await axios.get(`http://localhost:3000/Admin/vehicle/${id}`)
            setRecipientCar(res.data)
        }
        getCar()
    }, [id]) //newMessage

    return {
      recipientCar
    }
}
