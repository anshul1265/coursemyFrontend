import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer({ courses: [], lectures: [] }, (builder) => {
  builder
    // requesting for all the courses
    .addCase("allCoursesRequest", (state) => {
      state.loading = true;
    })
    .addCase("allCoursesSuccess", (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    })
    .addCase("allCoursesFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // get the course
    .addCase("getCourseRequest", (state) => {
      state.loading = true;
    })
    .addCase("getCoursesSuccess", (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    })
    .addCase("getCoursesFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // add to playlist
    .addCase("addToPlaylistRequest", (state) => {
      state.loading = true;
    })
    .addCase("addToPlaylistSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("addToPlaylistFail", (state, action) => {
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