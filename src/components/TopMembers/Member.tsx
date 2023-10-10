import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import FollowBtn from "../Widgets/FollowBtn";
import styles from "./top.module.scss";
import { Hash } from "react-feather";

const Member = () => {
  return (
    <div className={styles.member}>
      <header>
        <Link to={"/"} className={styles.user}>
          <Avatar />
          <h3>Benedict Umeozor</h3>
        </Link>
        <FollowBtn />
      </header>
      <footer>
        <Link to={"/"}>
          <Hash />
          <span>5 questions</span>
        </Link>
      </footer>
    </div>
  );
};
export default Member;
