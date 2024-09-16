import axios from "axios";
import {
    loadOneUser
} from "./user_slice";


export function getOneUser(id) {
    return async (dispatch) => {
        try {
             let res = await axios.get(`http://localhost:3000/auth/find/${id}`)
             dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}

export function enterEmail(email) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/forgotpassword?email=${email}`)
            console.log(res.data);
            
            // dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}