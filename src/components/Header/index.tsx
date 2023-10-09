import { Search, Menu } from "react-feather";
import Container from "../../layout/Container";
import MobileDiv from "../../layout/MobileDiv";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import DesktopNav from "../DesktopNav";
import DesktopDiv from "../../layout/DesktopDiv";

const Header = () => {
  return (
    <header className={styles.header}>
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
          <Search />
          <input type="text" placeholder="Enter a search" />
        </DesktopDiv>
        <MobileDiv>
          <Menu />
        </MobileDiv>
      </Container>
    </header>
  );
};
export default Header;
