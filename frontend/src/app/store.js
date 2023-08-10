import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../features/layout/layoutSlice";
import loginSlice from "../features/login/loginSlice";
import productsSlice from "../features/products/productsSlice";
import usersSlice from "../features/admin/usersSlice";
import ordersSlice from "../features/orders/ordersSlice";
import customersSlice from "../features/customers/customersSlice";
import transactionsSlice from "../features/transactions/transactionsSlice";

const rootReducer = {
    layout: layoutSlice,
    login: loginSlice,
    products: productsSlice,
    users: usersSlice,
    orders: ordersSlice,
    customers: customersSlice,
    transactions: transactionsSlice
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;