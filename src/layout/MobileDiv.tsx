import { ChildrenWithClassName } from "../helpers/types";
import styles from "./layout.module.scss";

const MobileDiv = ({
  children,
  className,
  onClick,
}: ChildrenWithClassName & { onClick?: () => void }) => {
  return (
    <div className={`${styles.mobile} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
export default MobileDiv;
