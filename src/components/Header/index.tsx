import { Search, Menu, X } from "react-feather";
import Container from "../../layout/Container";
import MobileDiv from "../../layout/MobileDiv";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import DesktopNav from "../DesktopNav";
import DesktopDiv from "../../layout/DesktopDiv";
import { useEffect, useState } from "react";
import MobileNav from "../MobileNav";

import { AnimatePresence } from "framer-motion";
import { setFixedBody } from "../../utils";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFixedBody(showNav);
  }, [showNav]);

  useEffect(() => {
    if (showNav) {
      setHasScrolled(false);
    }
  }, [showNav]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${hasScrolled ? styles.scrolled : ""}`}
      >
        <Container className={styles.container}>
          <MobileDiv>
            <Link to="/search">
              <Search />
            </Link>
          </MobileDiv>
          <Link to="/" className={styles.logo}>
            <h1>ThoughtForum</h1>
          </Link>
          <DesktopNav />
          <DesktopDiv className={styles.search}>
            <input
              type="text"
              placeholder="Enter a search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTerm) {
                  navigate("/search?search=" + searchTerm);
                }
              }}
            />
            <Search />
          </DesktopDiv>
          <MobileDiv onClick={() => setShowNav((prev) => !prev)}>
            {showNav ? <X /> : <Menu />}
          </MobileDiv>
        </Container>
      </header>
      <AnimatePresence>
        {showNav && <MobileNav onClick={() => setShowNav(false)} />}
      </AnimatePresence>
    </>
  );
};
export default Header;
