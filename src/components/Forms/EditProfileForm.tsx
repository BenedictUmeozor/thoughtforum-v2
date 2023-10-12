import { X } from "react-feather";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";

type PropTypes = {
  onClick: () => void;
  onSubmit?: () => void;
};

const EditProfileForm = ({ onClick }: PropTypes) => {
  return (
    <Modal>
      <form className={styles.form}>
        <div className={styles.close}>
          <X onClick={onClick} />
        </div>
        <p className={styles.title}>Edit profie</p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label>Name:</label>
            <input type="text" placeholder="Enter name" />
          </div>
          <div className={styles.field}>
            <label>Email:</label>
            <input
              type="email"
              value={"benedictumeozor@gmail.com"}
              placeholder="Enter email"
              disabled
            />
          </div>
          <div className={styles.field}>
            <label>Gender:</label>
            <select>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Bio:</label>
            <textarea rows={8} placeholder="Enter bio"></textarea>
          </div>
          <button>Edit Profile</button>
        </div>
      </form>
    </Modal>
  );
};
export default EditProfileForm;
