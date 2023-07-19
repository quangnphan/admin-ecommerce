import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../features/layout/layoutSlice";
import loginSlice from "../features/login/loginSlice";

const rootReducer = {
    layout: layoutSlice,
    login: loginSlice,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;