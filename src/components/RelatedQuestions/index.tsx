import { TrendingDown } from "react-feather";
import Question from "./Question";
import styles from "./related.module.scss";

const RelatedQuestions = () => {
  return (
    <div className={styles.div}>
      <h3 className={styles.title}>
        <TrendingDown /> Related Questions
      </h3>
      <div className={styles.questions}>
        <Question />
        <Question />
        <Question />
      </div>
    </div>
  );
};
export default RelatedQuestions;
