import Question from "../../components/Question";
import Container from "../../layout/Container";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <div className={styles.filters}>
            <div className={`${styles.filter} ${styles.active}`}>
              <p>Recent</p>
              <div className={styles.line}></div>
            </div>
            <div className={styles.filter}>
              <p>Following</p>
              <div className={styles.line}></div>
            </div>
            <div className={styles.filter}>
              <p>Featured</p>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.questions}>
            <Question />
            <Question />
            <Question />
          </div>
        </div>
        <div className={styles.right}></div>
      </Container>
    </main>
  );
};
export default Home;
