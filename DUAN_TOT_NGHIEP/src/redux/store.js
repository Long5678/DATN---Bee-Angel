
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
import { blogSlice } from "./blog_slice";
import { CommentSlice } from "./comment_slice";
import {oderSlice} from "./order_slice"
import { RatingSlice } from "./rating_slice";
import {
    orderVehicleSlice
} from "./ordervehicle_slice";
import {
    vehicleSlice
} from "./vehicleType_slice";
import {
    carSlice
} from "./car_slice";
import {
    notifiChatSlice
} from "./notifiChat_slice"
import {
    notifySlice
} from "./notification_slice";
import {
    RatingVehicleSlice
} from "./ratingvehicle_slice";
import {
    notifyVehicleSlice
} from "./notificationVehi_slice";

export const rootReducer = combineSlices(userSlice, danhMucSlice, tourSlice, chatSlice, messageSlice, blogSlice, CommentSlice, oderSlice, RatingSlice, vehicleSlice, carSlice, orderVehicleSlice, notifiChatSlice, notifySlice, RatingVehicleSlice, notifyVehicleSlice);

export const store = configureStore({
    reducer: rootReducer,
});