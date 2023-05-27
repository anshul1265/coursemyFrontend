import { server } from "../store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    // dispatching the login request
    dispatch({ type: "loginRequest" });
    // getting the required data from the backend
    const { data } = await axios.post(`${server}/login`, { email, password }, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });
    // dispatching the login success
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    // dispatching the login fail
    dispatch({ type: "loginFail", payload: error.response.data.message })
  }
}

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });
    const { data } = await axios.post(`${server}/register`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      }, withCredentials: true,
    });
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
}

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get(`${server}/me`, { withCredentials: true });
    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    const { data } = await axios.delete(`${server}/logout`, { withCredentials: true });
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
}

export const buySubscription = () => async (dispatch) => {
  try {
    dispatch({ type: "buySubscriptionRequest" });
    const { data } = await axios.get(`${server}/subscribe`, { withCredentials: true, });
    dispatch({ type: "buySubscriptionSuccess", payload: data.subscriptionId });
  } catch (error) {
    dispatch({ type: "buySubscriptionFail", payload: error.response.data.message });
  }
}

export const cancelSubscription = () => async (dispatch) => {
  try {
    dispatch({ type: "cancelSubscriptionRequest" });
    const { data } = await axios.delete(`${server}/subscribe/cancel`, { withCredentials: true, });
    dispatch({ type: "cancelSubscriptionSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "cancelSubscriptionFail", payload: error.response.data.message });
  }
}