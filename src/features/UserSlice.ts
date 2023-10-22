import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../helpers/types";

const initialState: UserProfile = JSON.parse(localStorage.getItem("user")!) || {
  _id: "",
  name: "",
  email: "",
  gender: "",
  bio: "",
  questions: [],
  following: [],
  followers: [],
  likedQuestions: [],
  likedAnswers: [],
  createdAt: "",
  updatedAt: "",
  __v: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile>) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },
    deleteUser(state) {
      localStorage.removeItem("user");
      return {
        ...state,
        _id: "",
        name: "",
        email: "",
        gender: "",
        bio: "",
        questions: [],
        following: [],
        followers: [],
        likedQuestions: [],
        likedAnswers: [],
        createdAt: "",
        updatedAt: "",
        __v: 0,
      };
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
