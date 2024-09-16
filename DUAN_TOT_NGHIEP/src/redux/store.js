import {
    configureStore
} from "@reduxjs/toolkit";

import {
    combineSlices
} from "@reduxjs/toolkit";

import { userSlice } from "./user_slice";

export const rootReducer = combineSlices(userSlice);

export const store = configureStore({
    reducer: rootReducer,
});