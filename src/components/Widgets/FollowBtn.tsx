import { Plus } from "react-feather";
import styles from "./widgets.module.scss";

const FollowBtn = () => {
  return <button className={styles.button}>
    <Plus /> <p>follow</p>
  </button>;
};
export default FollowBtn;
