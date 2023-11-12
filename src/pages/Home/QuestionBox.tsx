import AddQuestionForm from "../../components/Forms/AddQuestionForm";
import { setFixedBody } from "../../utils";
import styles from "./home.module.scss";
import { useState, useEffect, memo } from "react";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../hooks";
import { useAxiosInstance } from "../../hooks/useAxios";
import { Link } from "react-router-dom";

const QuestionBox = memo(() => {
  const [showForm, setShowForm] = useState(false);
  const questions = useAppSelector((state) => state.questions);
  const { refreshToken } = useAppSelector((state) => state.auth);
  const [answersCount, setAnswersCount] = useState(0);

  const { fetchData } = useAxiosInstance("/answers");

  const displayForm = () => {
    setShowForm(true);
    setFixedBody(true);
  };

  const hideForm = () => {
    setShowForm(false);
    setFixedBody(false);
  };

  useEffect(() => {
    const getAnswersCount = async () => {
      const data = await fetchData();
      setAnswersCount(data?.answersCount);
    };
    getAnswersCount();
  }, []);

  return (
    <>
      <AnimatePresence>
        {showForm && (
          <AddQuestionForm key={"add-question-form"} onClick={hideForm} />
        )}
      </AnimatePresence>
      <div className={styles.questionBox}>
        <div className={styles.button}>
          {refreshToken ? (
            <button onClick={displayForm}>Ask a question</button>
          ) : (
            <>
              <p className={styles.text}>
                Want to ask a question? <Link to="/login">Login</Link>
              </p>
            </>
          )}
        </div>
        <div className={styles.stats}>
          <div>
            <p>Questions</p>
            <p>{questions.length}</p>
          </div>
          <div>
            <p>Answers</p>
            <p>{answersCount}</p>
          </div>
        </div>
      </div>
    </>
  );
});
export default QuestionBox;
