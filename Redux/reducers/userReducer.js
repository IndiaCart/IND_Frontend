import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading:false,
  userData:["akash"]
}

export const userReducer = createReducer(initialState, (builder) => {

  builder
    .addCase("LOGIN_USER_STATUS", (state , action) => {
      state.loading = false;
      state.userData = action.payload;
    })
    .addCase("LOGOUT_USER_STATUS", (state , action) => {
      state.loading = false;
      state.userData = action.payload;
    })
});