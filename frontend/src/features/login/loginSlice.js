import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../api/api";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  loginStatus: "idle", // idle | loading | succeeded | failed
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loginStatus = "loading";
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
    },
    loginFailure: (state) => {
      state.isLoggedIn = false;
      state.loginStatus = "failed";
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    // Make API call to login endpoint
    const response = await apiClient.post("/auth/login", credentials);
    // Handle successful login
    // - Update token in local storage
    // - Dispatch loginSuccess action
    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess());
    }
  } catch (error) {
    // Handle login failure
    // - Dispatch loginFailure action with error message
    dispatch(loginFailure());
    console.log(error);
  }
};

export default loginSlice.reducer;
