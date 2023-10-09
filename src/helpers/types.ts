import { ReactNode } from "react";

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
