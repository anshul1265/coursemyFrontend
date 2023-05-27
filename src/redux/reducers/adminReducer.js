import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, (builder) => {
  builder
    // get admin stats
    .addCase("getAdminStatsRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAdminStatsSuccess", (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.usersCount = action.payload.usersCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.viewsCount = action.payload.viewsCount;
      state.usersProfit = action.payload.usersProfit;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.viewsProfit = action.payload.viewsProfit;
      state.usersPercentage = action.payload.usersPercentage;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
    })
    .addCase("getAdminStatsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // get all users 
    .addCase("getAllUsersRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllUsersSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // update the role of the user
    .addCase("updateUserRoleRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserRoleSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateUserRoleFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // delete the user
    .addCase("deleteUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteUserSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // create course
    .addCase("createCourseRequest", (state) => {
      state.loading = true;
    })
    .addCase("createCourseSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("createCourseFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // delete course
    .addCase("deleteCourseRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteCourseSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteCourseFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // add Lecture
    .addCase("addLectureRequest", (state) => {
      state.loading = true;
    })
    .addCase("addLectureSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("addLectureFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // delete Lecture
    .addCase("deleteLectureRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteLectureSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteLectureFail", (state, action) => {
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
}); 