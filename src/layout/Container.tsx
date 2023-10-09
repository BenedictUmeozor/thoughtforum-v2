import { ChildrenWithClassName } from "../helpers/types";
import styles from "./layout.module.scss";

const Container = ({ children, className }: ChildrenWithClassName) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
export default Container;
