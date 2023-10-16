import { Edit2, ExternalLink, MessageSquare } from "react-feather";
import { useState } from "react";
import styles from "./user.module.scss";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { setFixedBody } from "../../utils";
import EditQuestionForm from "../../components/Forms/EditQuestionForm";
import { Question as QuestionType } from "../../helpers/types";
import { useAppSelector } from "../../hooks";

type PropTypes = {
  id?: string;
  question: QuestionType;
  getQuestions: () => void;
};

const Question = ({ question, getQuestions }: PropTypes) => {
  const [showForm, setShowForm] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);

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
          <EditQuestionForm
            onClick={hideForm}
            question={question}
            onEdit={getQuestions}
          />
        )}
      </AnimatePresence>
      <div className={styles.question}>
        <Link to={"/questions/" + question._id}>
          {question.title}
          <ExternalLink />
        </Link>
        <footer>
          <div className={styles.answer}>
            <MessageSquare /> {question.answers.length} answers
          </div>
          {_id && _id === question.user._id && (
            <div className={styles.action}>
              <Edit2 onClick={displayForm} />
            </div>
          )}
        </footer>
      </div>
    </>
  );
};
export default Question;
