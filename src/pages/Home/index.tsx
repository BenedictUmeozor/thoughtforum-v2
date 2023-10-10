import HotQuestions from "../../components/HotQuestions";
import Question from "../../components/Question";
import TopMembers from "../../components/TopMembers";
import Container from "../../layout/Container";
import DesktopDiv from "../../layout/DesktopDiv";
import MobileDiv from "../../layout/MobileDiv";
import QuestionBox from "./QuestionBox";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <MobileDiv>
            <QuestionBox />
          </MobileDiv>
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
        <div className={styles.right}>
          <DesktopDiv>
            <QuestionBox />
          </DesktopDiv>
          <HotQuestions />
          <TopMembers />
        </div>
      </Container>
    </main>
  );
};
export default Home;
