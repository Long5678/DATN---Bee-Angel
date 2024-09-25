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

export const rootReducer = combineSlices(userSlice, danhMucSlice, tourSlice, chatSlice, messageSlice);

export const store = configureStore({
    reducer: rootReducer,
});