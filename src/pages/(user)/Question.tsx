import { Edit2, ExternalLink, MessageSquare, Trash2 } from "react-feather";
import styles from "./user.module.scss";
import { Link } from "react-router-dom";

const Question = () => {
  return (
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
          <Edit2 />
          <Trash2 />
        </div>
      </footer>
    </div>
  );
};
export default Question;
