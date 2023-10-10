import styles from "./home.module.scss";

const QuestionBox = () => {
  return (
    <div className={styles.questionBox}>
      <div className={styles.button}>
        <button>Ask a question</button>
      </div>
      <div className={styles.stats}>
        <div>
          <p>Questions</p>
          <p>0</p>
        </div>
        <div>
          <p>Answers</p>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};
export default QuestionBox;
