import { X } from "react-feather";
import Modal from "../../layout/Modal";
import styles from "./modal.module.scss";
// import User from "./User";

type PropTypes = {
  id?: string | number;
  onClose?: () => void;
};

const LikesModal = ({ onClose }: PropTypes) => {
  return (
    <Modal>
      <div className={styles.div}>
        <div className={styles.close}>
          <X onClick={onClose} />
        </div>
        <p className={styles.title}>Likes</p>

        <div className={styles.users}>
          {/* <User />
          <User />
          <User />
          <User /> */}
        </div>
      </div>
    </Modal>
  );
};
export default LikesModal;
