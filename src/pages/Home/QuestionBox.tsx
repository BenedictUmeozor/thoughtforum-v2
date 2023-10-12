import AddQuestionForm from "../../components/Forms/AddQuestionForm";
import { setFixedBody } from "../../utils";
import styles from "./home.module.scss";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const QuestionBox = () => {
  const [showForm, setShowForm] = useState(false);

  const displayForm = () => {
    setShowForm(true);
    setFixedBody(true);
  };

  const hideForm = () => {
    setShowForm(false);
    setFixedBody(false);
  };

  return (
    <>
      <AnimatePresence>
        {showForm && (
          <AddQuestionForm key={"add-question-form"} onClick={hideForm} />
        )}
      </AnimatePresence>
      <div className={styles.questionBox}>
        <div className={styles.button}>
          <button onClick={displayForm}>Ask a question</button>
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
    </>
  );
};
export default QuestionBox;
