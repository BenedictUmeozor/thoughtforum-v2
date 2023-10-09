import styles from "./nav.module.scss";
import { NavLink } from "react-router-dom";
import { Moon, Sun } from "react-feather";
import { useThemeContext } from "../../hooks";

const DesktopNav = () => {
  const { theme, _setTheme } = useThemeContext();

  const toggleTheme = () => {
    if (theme === "light") {
      _setTheme("dark");
    } else {
      _setTheme("light");
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Questions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Register
          </NavLink>
        </li>
        <li onClick={toggleTheme}>{theme === "light" ? <Moon /> : <Sun />}</li>
      </ul>
    </nav>
  );
};
export default DesktopNav;
