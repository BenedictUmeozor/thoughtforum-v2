import { ChildrenWithClassName } from "../helpers/types";
import styles from "./layout.module.scss";

const MobileDiv = ({ children, className }: ChildrenWithClassName) => {
  return <div className={`${styles.mobile} ${className}`}>{children}</div>;
};
export default MobileDiv;
