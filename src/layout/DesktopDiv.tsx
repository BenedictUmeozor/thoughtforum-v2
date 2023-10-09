import { ChildrenWithClassName } from "../helpers/types";
import styles from "./layout.module.scss";

const DesktopDiv = ({ className, children }: ChildrenWithClassName) => {
  return <div className={`${styles.desktop} ${className}`}>{children}</div>;
};
export default DesktopDiv;
