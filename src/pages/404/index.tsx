import { Link } from "react-router-dom";
import Container from "../../layout/Container";
import styles from "./error.module.scss";

const ErrorPage = () => {
  return (
    <>
      <main className={styles.main}>
        <Container>
          <h2>
            Something went <br /> <span>wrong</span>
          </h2>
          <Link to="/">Go home</Link>
        </Container>
      </main>
    </>
  );
};
export default ErrorPage;
