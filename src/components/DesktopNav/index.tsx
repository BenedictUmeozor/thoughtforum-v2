import styles from "./nav.module.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Moon, Sun } from "react-feather";
import { useAppSelector, useThemeContext } from "../../hooks";
import { AnimatePresence } from "framer-motion";
import Logout from "../Logout";
import { setFixedBody } from "../../utils";

const DesktopNav = () => {
  const { theme, _setTheme } = useThemeContext();
  const { refreshToken } = useAppSelector((state) => state.auth);
  const categories = useAppSelector((state) => state.categories);
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
    setShowModal(false);
    setFixedBody(false);
  };

  return (
    <>
      <AnimatePresence>
        {showModal && <Logout onClose={hideModal} />}
      </AnimatePresence>
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
              to={"/categories/" + categories[0]?._id}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Categories
            </NavLink>
          </li>
          {refreshToken ? (
            <>
              {" "}
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? styles.active : "")}
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
              {" "}
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
            </>
          )}
          <li onClick={toggleTheme}>
            {theme === "light" ? <Moon /> : <Sun />}
          </li>
        </ul>
      </nav>
    </>
  );
};
export default DesktopNav;
