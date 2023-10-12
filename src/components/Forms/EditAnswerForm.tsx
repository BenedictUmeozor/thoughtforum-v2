import { X } from "react-feather";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";

type PropTypes = {
  onClick: () => void;
  onSubmit?: () => void;
};

const EditAnswerForm = ({ onClick }: PropTypes) => {
  return (
    <Modal>
      <form className={styles.form}>
        <div className={styles.close}>
          <X onClick={onClick} />
        </div>
        <p className={styles.title}>Edit this answer</p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label>Body:</label>
            <textarea rows={8} placeholder="Enter answer body"></textarea>
          </div>
          <button>Update</button>
        </div>
      </form>
    </Modal>
  );
};
export default EditAnswerForm;
