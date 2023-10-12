import { Children } from "../helpers/types";
import styles from "./layout.module.scss";
import { motion } from "framer-motion";

const Modal = ({ children }: Children) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween" }}
      className={styles.modal}
    >
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ delay: 0.5 }}
        className={styles.content}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
export default Modal;
