import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../features/layout/layoutSlice";
import loginSlice from "../features/login/loginSlice";
import productsSlice from "../features/products/productsSlice";

const rootReducer = {
    layout: layoutSlice,
    login: loginSlice,
    products: productsSlice
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;