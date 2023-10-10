import { Zap } from "react-feather";
import HotQuestion from "./HotQuestion";
import styles from "./hot.module.scss";

const HotQuestions = () => {
  return (
    <div className={styles.div}>
      <div className={styles.title}>
        <Zap /> <h4>Hot Questions</h4>
      </div>
      <div>
        <HotQuestion />
        <HotQuestion />
        <HotQuestion />
      </div>
    </div>
  );
};
export default HotQuestions;
