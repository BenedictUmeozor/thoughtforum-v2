import styles from "./question.module.scss";
import image from "../../assets/man.png";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, Eye } from "react-feather";

const Question = () => {
  return (
    <div className={styles.question}>
      <header>
        <img src={image} alt="image" />
        <Link to={"/"}>
          <h3>Benedict Umeozor</h3>
        </Link>
      </header>
      <div className={styles.body}>
        <Link to={"/"}>
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
        </Link>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa non
          tempore ab odit quibusdam repudiandae, quaerat laudantium facere
          impedit ipsum.
        </p>
        <small>Asked: 8th October, 2023</small>
      </div>
      <footer>
        <div className={styles.action}>
          <div>
            <Heart />
            <p>14</p>
          </div>
          <div>
            <MessageSquare />
            <p>14</p>
          </div>
        </div>
        <Link to={"/"}>
          <Eye />
          See Answers
        </Link>
      </footer>
    </div>
  );
};
export default Question;
