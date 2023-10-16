import { RelatedQuestion } from "../../helpers/types";
import styles from "./related.module.scss";
import { Link } from "react-router-dom";

type PropTypes = {
  question: RelatedQuestion;
};

const Question = ({ question }: PropTypes) => {
  return (
    <div className={styles.question}>
      <Link to={"/user/" + question.user._id} className={styles.name}>
        <h3>{question.user.name}</h3>
      </Link>
      <Link to={"/questions/" + question._id} className={styles.questionTitle}>
        {question.title}
      </Link>
      <p>
        {question.body.substring(0, 120) +
          [
            question.body.length > question.body.substring(0, 120).length
              ? "..."
              : "",
          ]}
      </p>
    </div>
  );
};
export default Question;
