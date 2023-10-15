import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../helpers/types";

const initialState: UserProfile = {
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
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
