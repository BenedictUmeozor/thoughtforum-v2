import { X } from "react-feather";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";

type PropTypes = {
  onClick: () => void;
  onSubmit?: () => void;
};

const AddAnswerForm = ({ onClick }: PropTypes) => {
  return (
    <Modal>
      <form className={styles.form}>
        <div className={styles.close}>
          <X onClick={onClick} />
        </div>
        <p className={styles.title}>Answer this question</p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label>Body:</label>
            <textarea rows={8} placeholder="Enter answer body"></textarea>
          </div>
          <button>Answer</button>
        </div>
      </form>
    </Modal>
  );
};
export default AddAnswerForm;
