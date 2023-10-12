import { Edit2, ExternalLink, MessageSquare, Trash2 } from "react-feather";
import { useState } from "react";
import styles from "./user.module.scss";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { setFixedBody } from "../../utils";
import EditQuestionForm from "../../components/Forms/EditQuestionForm";

const Question = () => {
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
        {showForm && <EditQuestionForm onClick={hideForm} />}
      </AnimatePresence>
      <div className={styles.question}>
        <Link to={"/"}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          <ExternalLink />
        </Link>
        <footer>
          <div className={styles.answer}>
            <MessageSquare /> 4 answers
          </div>
          <div className={styles.action}>
            <Edit2 onClick={displayForm} />
            <Trash2 />
          </div>
        </footer>
      </div>
    </>
  );
};
export default Question;
