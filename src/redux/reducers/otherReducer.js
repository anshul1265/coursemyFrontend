import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer({}, (builder) => {
  builder
    // contact request
    .addCase("contactRequest", (state) => {
      state.loading = true;
    })
    .addCase("contactSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("contactFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // course request
    .addCase("courseRequestRequest", (state) => {
      state.loading = true;
    })
    .addCase("courseRequestSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("courseRequestFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // clear the error and normal success messages
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    })
})