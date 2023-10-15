import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../helpers/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
