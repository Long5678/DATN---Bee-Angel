import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    isLoadingBlog: false,
    blogDatas: [],
    blogOne: {},
};

export const blogSlice = createSlice({
    name: "blogSL",
    initialState,
    reducers: {
        loadAllBlog(state, action) {
            state.blogDatas = action.payload;
        },
        addOneBlog(state, action) {
            state.blogDatas.push(action.payload)
        },
        delOneBlog(state, action) {
            state.blogDatas = state.blogDatas.filter((item) => {
                return item._id != action.payload
            })
        },
        loadOneBlog(state, action) {
            state.blogOne = action.payload;
        },
        updateOneBlog(state, action) {
            const index = state.blogDatas.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.blogDatas[index] = action.payload;
            }
        },

        // laoding
        loadingBlog(state, action) {
            state.isLoadingBlog = action.payload;
        },
    }
})


export const {
    loadAllBlog,
    addOneBlog,
    delOneBlog,
    loadOneBlog,
    updateOneBlog,
    loadingBlog
} = blogSlice.actions;