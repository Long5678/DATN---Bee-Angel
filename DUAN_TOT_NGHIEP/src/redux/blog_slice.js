import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    isLoadingBlog: false,
    isLoadingAddBlog: false,
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
            console.log('cc', action.payload);

            state.blogDatas.push(action.payload.newBlog)
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

        loadingAddBlog(state, action) {
            state.isLoadingAddBlog = action.payload;
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
    loadingBlog,
    loadingAddBlog
} = blogSlice.actions;
