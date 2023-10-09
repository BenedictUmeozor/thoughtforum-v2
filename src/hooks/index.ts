import { useContext } from "react";
import { ThemeContext } from "../context/theme";

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
