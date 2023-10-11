import { Link } from "react-router-dom";
import HotQuestions from "../../components/HotQuestions";
import Question from "../../components/Question";
import TopMembers from "../../components/TopMembers";
import Container from "../../layout/Container";
import DesktopDiv from "../../layout/DesktopDiv";
import MobileDiv from "../../layout/MobileDiv";
import QuestionBox from "../Home/QuestionBox";
import styles from "./categories.module.scss";

const categories = [
  "technology",
  "career",
  "kdrama",
  "education",
  "finance",
  "science and technology",
];

const Categories = () => {
  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <MobileDiv>
            <QuestionBox />
          </MobileDiv>
          <div className={styles.categories}>
            {categories.map((category) => (
              <Link to={"/"} key={category} className={styles.category}>
                {category}
              </Link>
            ))}
          </div>
          <div className={styles.page}>
            <h3 className={styles.title}>Technology</h3>

            <div className={styles.questions}>
              <Question />
              <Question />
              <Question />
              <Question />
            </div>
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
export default Categories;
