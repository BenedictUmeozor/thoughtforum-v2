import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import styles from "./hot.module.scss";
import { MessageSquare } from "react-feather";
import { Question } from "../../helpers/types";

type PropTypes = {
  question: Question;
};

const HotQuestion = ({ question }: PropTypes) => {
  return (
    <>
      <div className={styles.child}>
        <header>
          <Avatar name={question.user.name} />{" "}
          <Link to={"/user/" + question.user._id}>{question.user.name}</Link>
        </header>
        <div className={styles.body}>
          <p>
            <Link to={"/questions/" + question._id}>{question.title}</Link>
          </p>
        </div>
        <footer>
          <Link to={"/questions/" + question._id}>
            <MessageSquare />
            <span>
              {question.answers.length}{" "}
              {question.answers.length === 1 ? "answer" : "answers"}
            </span>
          </Link>
        </footer>
      </div>
    </>
  );
};
export default HotQuestion;
