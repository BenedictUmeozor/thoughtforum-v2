import { Check, Plus } from "react-feather";
import styles from "./widgets.module.scss";

type PropTypes = {
  isFollowing?: boolean;
  onFollow?: () => Promise<void>;
  isLoading?: boolean;
};

const FollowBtn = ({ isFollowing, isLoading, onFollow }: PropTypes) => {
  return (
    <>
      {isFollowing ? (
        <button
          disabled={isLoading}
          className={`${styles.button} ${styles.following}`}
          onClick={onFollow}
        >
          <Check /> <p>following</p>
        </button>
      ) : (
        <button
          disabled={isLoading}
          className={styles.button}
          onClick={onFollow}
        >
          <Plus /> <p>follow</p>
        </button>
      )}
    </>
  );
};
export default FollowBtn;
