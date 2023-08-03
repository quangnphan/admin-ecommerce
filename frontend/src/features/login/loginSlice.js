import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../api/api";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  loginStatus: "idle", // idle | loading | succeeded | failed
  errorMessage: null,
  user: null,
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await apiClient.post("/auth/login", credentials);
    if (response.status === 200) {
      const { token,user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username",user.name);
      dispatch(loginSuccess(response.data));
    }
  } catch (error) {
    const errorMessage = error.response.data.error || "Unknown error";
    dispatch(loginFailure(errorMessage));
    console.log(error);
  }
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loginStatus = "loading";
      state.errorMessage = ""; // Reset error message when login request is initiated
    },
    loginSuccess: (state,action) => {
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
      state.errorMessage = ""; // Reset error message when login is successful
      state.user = action.payload;
    },
    loginFailure: (state,action) => {
      state.isLoggedIn = false;
      state.loginStatus = "failed";
      state.errorMessage = action.payload; // Set the error message from the action payload
      state.user = null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
      state.loginStatus = "idle";
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure,clearErrorMessage } = loginSlice.actions;

export default loginSlice.reducer;
