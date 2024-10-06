import {
    configureStore
} from "@reduxjs/toolkit";

import {
    combineSlices
} from "@reduxjs/toolkit";

import { userSlice } from "./user_slice";
import { danhMucSlice } from "./danhMuc_slice";
import { tourSlice } from "./tour_slice";
import { chatSlice } from "./chat_slice";
import { messageSlice } from "./message_slice";
<<<<<<< HEAD
import { blogSlice } from "./blog_slice";

export const rootReducer = combineSlices(userSlice, danhMucSlice, tourSlice, chatSlice, messageSlice, blogSlice);
=======
import { CommentSlice } from "./comment_slice";

export const rootReducer = combineSlices(userSlice, danhMucSlice, tourSlice, chatSlice, messageSlice, CommentSlice);
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd

export const store = configureStore({
    reducer: rootReducer,
});