import { GridLoader } from "react-spinners";
import styles from "./layout.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <GridLoader color="#5d95e8" loading={true} size={25} />
    </div>
  );
};
export default Loader;
