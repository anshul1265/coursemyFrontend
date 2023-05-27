import { createReducer } from "@reduxjs/toolkit";

// setting all all the user reducers
export const userReducer = createReducer({}, (builder) => {
  builder
    // reducers for login page
    .addCase("loginRequest", (state) => {
      state.loading = true;
    })
    .addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase("loginFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    // register
    .addCase("registerRequest", (state) => {
      state.loading = true;
    })
    .addCase("registerSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase("registerFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    // load User
    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadUserSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("loadUserFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    // logout
    .addCase("logoutRequest", (state) => {
      state.loading = true;
    })
    .addCase("logoutSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    })
    .addCase("logoutFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    })
    // to clear the error and other messages
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    })
});

export const profileReducer = createReducer({}, (builder) => {
  builder
    // update profile
    .addCase("updateProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProfileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // update profile picture
    .addCase("updateProfilePictureRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProfilePictureSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProfilePictureFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // change password
    .addCase("changePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("changePasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("changePasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // forget password
    .addCase("forgetPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("forgetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("forgetPasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // reset password
    .addCase("resetPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("resetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("resetPasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // remove from the playlist
    .addCase("removeFromPlaylistRequest", (state) => {
      state.loading = true;
    })
    .addCase("removeFromPlaylistSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("removeFromPlaylistFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // to clear the error and other messages
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    });
});

export const subscriptionReducer = createReducer({}, (builder) => {
  builder
    // buy subscription
    .addCase("buySubscriptionRequest", (state) => {
      state.loading = true;
    })
    .addCase("buySubscriptionSuccess", (state, action) => {
      state.loading = false;
      state.subscriptionId = action.payload;
    })
    .addCase("buySubscriptionFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // cancel subscription
    .addCase("cancelSubscriptionRequest", (state) => {
      state.loading = true;
    })
    .addCase("cancelSubscriptionSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("cancelSubscriptionFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // clear message and error
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", state => {
      state.message = null;
    })
});