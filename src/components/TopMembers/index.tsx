import { Users } from "react-feather";
import styles from "./top.module.scss";
import Member from "./Member";

const TopMembers = () => {
  return (
    <div className={styles.div}>
      <div className={styles.title}>
        <Users />
        <h4>Top Members</h4>
      </div>
      <div>
        <Member />
        <Member />
        <Member />
      </div>
    </div>
  );
};
export default TopMembers;
