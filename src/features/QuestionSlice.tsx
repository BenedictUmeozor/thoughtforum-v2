import { createSlice } from "@reduxjs/toolkit";
import { Question } from "../helpers/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Question[] = [];

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
