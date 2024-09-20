import {
    configureStore
} from "@reduxjs/toolkit";

import {
    combineSlices
} from "@reduxjs/toolkit";

import { userSlice } from "./user_slice";
import { danhMucSlice } from "./danhMuc_slice";
import { tourSlice } from "./tour_slice";

export const rootReducer = combineSlices(userSlice, danhMucSlice, tourSlice);

export const store = configureStore({
    reducer: rootReducer,
});