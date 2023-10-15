import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/AuthSlice";
import CategoriesSlice from "../features/CategoriesSlice";
import QuestionSlice from "../features/QuestionSlice";
import UserSlice from "../features/UserSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    categories: CategoriesSlice,
    questions: QuestionSlice,
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
