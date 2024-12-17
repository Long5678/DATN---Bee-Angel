import axios from "axios";
import {
    getCommentsByTourId,
    createComment,
    replyToComment,
    updateComment,
    deleteComment,
    loadingComment,
    getCommentById,
    loadAllToursWithComment

} from "../comment_slice";


// comment
export function getCommentByTourID(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Comment/${id}`)
            dispatch(getCommentsByTourId(res.data))

        } catch (error) {
            console.log(error);
        }
    }
}

//get Comment by Id
export function getCommentByID(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Comment/detail-comment/${id}`)
            dispatch(getCommentById(res.data))
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
}

export function getAllCommentTour() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Comment/allTourWithComments`);
            dispatch(loadAllToursWithComment(res.data))
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    };
}

// create comment
export function addComment(data) {
    return async (dispatch) => {
        try {
            dispatch(loadingComment(true))
            let res = await axios.post(`http://localhost:3000/Comment/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log("res data thunk add CM", res.data);

            dispatch(createComment(res.data))
        } catch (error) {
            console.log(error);
        } finally {
              dispatch(loadingComment(false))
        }
    }
}
//update comment
export function editComment(id, data) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/Comment/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log("res update comemnt", res.data);

            dispatch(updateComment(res.data))
        } catch (error) {
            console.log(error);

        }
    }

}
//del comment
export function delComment(id) {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3000/Comment/del/${id}`)
            dispatch(deleteComment(id))
        } catch (error) {
            console.log(error);

        }
    }
}


export function addReply(id, content, userId, comment, name) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/Comment/${id}/reply`, {
                content,
                userId,
                comment
            })
            dispatch(replyToComment({
                // userId: {
                //     name: name,
                //     _id: userId,
                // },
                userId: userId,
                comment: userId,
                content: content,
                findCommentId: id
            }));
        } catch (error) {
            console.log(error);
        }
    }
}
