import { createContext, useState } from "react";
import { Children, ThemeType } from "../helpers/types";

const context: ThemeType = {
  theme: "light",
  _setTheme: () => {},
};

export const ThemeContext = createContext(context);

export const ThemeContextProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState("light");

  const _setTheme = (theme: string) => {
    setTheme(theme);
    document.documentElement.className = theme;
    localStorage.setItem("theme", JSON.stringify(theme));
  };

  return (
    <ThemeContext.Provider value={{ theme, _setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
