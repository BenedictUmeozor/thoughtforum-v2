import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import styles from "./hot.module.scss";
import { MessageSquare } from "react-feather";

const HotQuestion = () => {
  return (
    <div className={styles.child}>
      <header>
        <Avatar /> <h3>Benedict Umeozor</h3>
      </header>
      <div className={styles.body}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          sapiente exercitationem nisi id, laboriosam excepturi!
        </p>
      </div>
      <footer>
        <Link to={"/"}>
          <MessageSquare />
          <span>15 answers</span>
        </Link>
      </footer>
    </div>
  );
};
export default HotQuestion;
