import { Auth } from "../helpers/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Auth = {
  _id: JSON.parse(localStorage.getItem("_id")!) || null,
  accessToken: JSON.parse(localStorage.getItem("accessToken")!) || null,
  refreshToken: JSON.parse(localStorage.getItem("refreshToken")!) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<Auth>) {
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.payload.refreshToken)
      );
      localStorage.setItem("_id", JSON.stringify(action.payload._id));

      return {
        ...state,
        _id: action.payload._id,
        refreshToken: action.payload.refreshToken,
        accessToken: action.payload.accessToken,
      };
    },
    deleteCredentials(state) {
      localStorage.removeItem("_id");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return {
        ...state,
        _id: null,
        refreshToken: null,
        accessToken: null,
      };
    },
  },
});

export const { setCredentials, deleteCredentials } = authSlice.actions;
export default authSlice.reducer;
