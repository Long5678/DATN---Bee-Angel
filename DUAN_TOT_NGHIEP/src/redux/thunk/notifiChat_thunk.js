import axios from "axios";
import {
    addOneNotifiChat,
    loadAllNotifiChat,
    addNewNotitiChat,
    updateOneNotifiChat
} from "../notifiChat_slice";


export function getAllNotifiChat(recipientId) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/notifiChat/getNotifiRecipientId/${recipientId}`)
            dispatch(loadAllNotifiChat(res.data))
        } catch (error) {
            console.log(error);
        }

    }
}

export function createNotifiChat(senderId, recipientId) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/notifiChat/add`, {
                senderId,
                recipientId
            })

            dispatch(addOneNotifiChat(res.data))
            dispatch(addNewNotitiChat(res.data))
        } catch (error) {
            console.log(error);
        }

    }
}

export function editOneNotifiChat(id) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/notifiChat/update/${id}`)
            dispatch(updateOneNotifiChat(res.data))
        } catch (error) {
            console.log(error);
        }

    }
}