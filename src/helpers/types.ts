import { ReactNode } from "react";

type User = {
  _id: string;
  name: string;
  followers: string[];
};

export type Category = {
  _id: string;
  title: string;
  questions: string[];
};

export type Children = {
  children: ReactNode;
};

export type ChildrenWithClassName = {
  children: ReactNode;
  className?: string;
};

export type ThemeType = {
  theme: string;
  _setTheme: (theme: string) => void;
};

export type FunctionProp = {
  onClick: () => void;
};

export type Auth = {
  _id: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type Question = {
  _id: string;
  title: string;
  body: string;
  user: User;
  answers: string[];
  likes: string[];
  category: Category;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserProfile = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  bio: string;
  questions: string[];
  following: string[];
  followers: string[];
  likedQuestions: string[];
  likedAnswers: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ModalUser = {
  _id: string;
  name: string;
  questions: string[];
  followers: string[];
  following: string[];
};

export type Snackbar = {
  success: boolean;
  successMessage: string;
  error: boolean;
  errorMessage: string;
  info: boolean;
  infoMessage: string;
  warning: boolean;
  warningMessage: string;
};

export type RelatedQuestion = {
  _id: string;
  title: string;
  body: string;
  user: {
    _id: string;
    name: string;
  };
};
