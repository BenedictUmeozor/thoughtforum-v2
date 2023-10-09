import { NavLink } from "react-router-dom";
import styles from "./nav.module.scss";
import { useThemeContext } from "../../hooks";
import { Moon, Sun } from "react-feather";
import { FunctionProp } from "../../helpers/types";
import { motion } from "framer-motion";

const MobileNav = ({ onClick }: FunctionProp) => {
  const { theme, _setTheme } = useThemeContext();

  const toggleTheme = () => {
    if (theme === "light") {
      _setTheme("dark");
    } else {
      _setTheme("light");
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween" }}
      className={styles.nav}
    >
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={onClick}
          >
            Questions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={onClick}
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={onClick}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={onClick}
          >
            Register
          </NavLink>
        </li>
        <li onClick={toggleTheme}>{theme === "light" ? <Moon /> : <Sun />}</li>
      </ul>
    </motion.nav>
  );
};
export default MobileNav;
