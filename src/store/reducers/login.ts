import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginType } from "./type";
const initialState: loginType = {
  isLogin: true,
  user: {
    email: "",
  },
  isLogout: false,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginHandler: (state, { payload }: PayloadAction<loginType["user"]>) => {
      state.isLogin = true;
      state.user = payload;
    },
    logoutHandler: (state) => {
      state.isLogin = false;
      state.user = initialState.user;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginHandler, logoutHandler } = loginSlice.actions;
export default loginSlice.reducer;
