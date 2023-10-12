import { X } from "react-feather";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";

type PropTypes = {
  onClick: () => void;
  onSubmit?: () => void;
};

const EditQuestionForm = ({ onClick }: PropTypes) => {
  return (
    <Modal>
      <form className={styles.form}>
        <div className={styles.close}>
          <X onClick={onClick} />
        </div>
        <p className={styles.title}>Edit Question</p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label>Title:</label>
            <input type="text" placeholder="Enter title" />
          </div>
          <div className={styles.field}>
            <label>Category:</label>
            <select>
              <option value="technology">Technology</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Body:</label>
            <textarea rows={8} placeholder="Enter question body"></textarea>
          </div>
          <button>Update question</button>
        </div>
      </form>
    </Modal>
  );
};
export default EditQuestionForm;
