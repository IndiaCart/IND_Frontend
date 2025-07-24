import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { adminReducer } from "./reducers/adminReducer/adminReducer";

const store = configureStore({
    reducer: {
         user: userReducer,
         admin: adminReducer
    }
});

export default store;
