import Container from "../../layout/Container";
import styles from "./auth.module.scss";
import image from "../../assets/singup.svg";
import { ChevronRight } from "react-feather";

const Register = () => {
  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <img src={image} alt="Create an Account" />
        </div>
        <div className={styles.right}>
          <h2>Create an account</h2>
          <p>
            Welcome to <span>ThoughtForum</span>. Lorem ipsum dolor sit amet.
          </p>
          <form>
            <div className={styles.field}>
              <input type="text" placeholder="Full name" />
              <div className={styles.line}></div>
            </div>
            <div className={styles.field}>
              <input type="email" placeholder="Email" />
              <div className={styles.line}></div>
            </div>
            <div className={styles.field}>
              <select>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className={styles.line}></div>
            </div>
            <div className={styles.field}>
              <input type="text" placeholder="Password" />
              <div className={styles.line}></div>
            </div>
            <button type="submit">
              Continue <ChevronRight />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};
export default Register;
