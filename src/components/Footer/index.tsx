import { Link } from "react-router-dom";
import Container from "../../layout/Container";
import styles from "./footer.module.scss";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "react-feather";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.main}>
          <div>
            <Link to="/">
              <h3>ThoughtForum</h3>
            </Link>
            <ul className={styles.ul}>
              <li>
                <Phone />
                <span>+234 810 821 8964</span>
              </li>
              <li>
                <Mail />
                <a href="mailto:benedictumeozor@gmail.com">
                  benedictumeozor@gmail.com
                </a>
              </li>
            </ul>
            <div className={styles.socials}>
              <a href="#">
                <Linkedin />
              </a>
              <a href="#">
                <Twitter />
              </a>
              <a href="#">
                <Facebook />
              </a>
              <a href="#">
                <Instagram />
              </a>
            </div>
          </div>

          <div>
            <h3>Take a tour</h3>
            <ul>
              <li>
                <Link to="/">Features</Link>
              </li>
              <li>
                <Link to="/">Pricing</Link>
              </li>
              <li>
                <Link to="/">Product</Link>
              </li>
              <li>
                <Link to="/">Support</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Our company</h3>
            <ul>
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Blog</Link>
              </li>
              <li>
                <Link to="/">Media</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>
              <li>
                <Link to="/">Privacy</Link>
              </li>
              <li>
                <Link to="/">Term of use</Link>
              </li>
              <li>
                <Link to="/">Help center</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            All rights reserved &copy;{" "}
            <a
              href="https://benedictumeozor.vercel.app"
              rel="noopener noreferrer"
            >
              Benedict
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
