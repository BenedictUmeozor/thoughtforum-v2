import { Children } from "../../helpers/types";
import styles from "./user.module.scss";

const Box = ({ children }: Children) => {
  return <div className={styles.box}>{children}</div>;
};
export default Box;
