import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading:false,
}

export const adminReducer = createReducer(initialState, (builder) => {

  builder
    .addCase("LOGIN_USER_STATUS", (state) => {
      state.loading = false;
    })
});