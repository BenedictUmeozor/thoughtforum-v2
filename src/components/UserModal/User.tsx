import Avatar from "../Avatar";
import FollowBtn from "../Widgets/FollowBtn";
import styles from "./modal.module.scss";

const User = () => {
  return (
    <div className={styles.user}>
      <header>
        <div>
          <Avatar />
          <p className={styles.name}>Benedict</p>
        </div>
        <FollowBtn />
      </header>
      <p className={styles.footer}>5 questions</p>
    </div>
  );
};
export default User;
