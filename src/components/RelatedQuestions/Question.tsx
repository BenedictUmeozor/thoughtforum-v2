import styles from "./related.module.scss";
import { Link } from "react-router-dom";

const Question = () => {
  return (
    <div className={styles.question}>
      <Link to={"/"} className={styles.name}>
        <h3>Benedict</h3>
      </Link>
      <Link to={"/"} className={styles.questionTitle}>Lorem ipsum dolor sit amet consectetur</Link>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor,
        incidunt.
      </p>
    </div>
  );
};
export default Question;
