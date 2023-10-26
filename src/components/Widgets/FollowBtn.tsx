import { Check, Plus } from "react-feather";
import styles from "./widgets.module.scss";
import { useQuestionContext } from "../../hooks";

type PropTypes = {
  isFollowing?: boolean;
  onFollow: () => Promise<void>;
  isLoading?: boolean;
};

const FollowBtn = ({ isFollowing, isLoading, onFollow }: PropTypes) => {
  const { setAppQuestions } = useQuestionContext();
  const handleClick = () => {
    onFollow().then(() => setAppQuestions());
  };

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
          onClick={handleClick}
        >
          <Plus /> <p>follow</p>
        </button>
      )}
    </>
  );
};
export default FollowBtn;
