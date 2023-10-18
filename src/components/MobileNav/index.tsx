import { NavLink } from "react-router-dom";
import styles from "./nav.module.scss";
import { useState } from "react";
import { useAppSelector, useThemeContext } from "../../hooks";
import { Moon, Sun } from "react-feather";
import { FunctionProp } from "../../helpers/types";
import { AnimatePresence, motion } from "framer-motion";
import { setFixedBody } from "../../utils";
import Logout from "../Logout";

const MobileNav = ({ onClick }: FunctionProp) => {
  const { theme, _setTheme } = useThemeContext();
  const { refreshToken } = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") {
      _setTheme("dark");
    } else {
      _setTheme("light");
    }
  };

  const displayModal = () => {
    setShowModal(true);
    setFixedBody(true);
  };

  const hideModal = () => {
    onClick();
    setShowModal(false);
    setFixedBody(false);
  };

  return (
    <>
      <AnimatePresence>
        {showModal && <Logout onClose={hideModal} />}
      </AnimatePresence>
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
              to={"/categories"}
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={onClick}
            >
              Categories
            </NavLink>
          </li>
          {refreshToken ? (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  onClick={onClick}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  onClick={(e) => {
                    e.preventDefault();
                    displayModal();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
          <li onClick={toggleTheme}>
            {theme === "light" ? <Moon /> : <Sun />}
          </li>
        </ul>
      </motion.nav>
    </>
  );
};
export default MobileNav;
