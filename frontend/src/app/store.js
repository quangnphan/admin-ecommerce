import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../features/layout/layoutSlice";

const rootReducer = {
    layout: layoutSlice,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;