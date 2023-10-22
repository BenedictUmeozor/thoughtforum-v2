import { X } from "react-feather";
import { useState, FormEvent } from "react";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";
import { Answer } from "../../helpers/types";
import { useAxiosAuth } from "../../hooks/useAxios";
import Loading from "../../layout/Backdrop";
import toast from "react-hot-toast";
import { useSocket } from "../../hooks";

type PropTypes = {
  onClick: () => void;
  onEdit: () => void;
  answer: Answer;
};

const EditAnswerForm = ({ onClick, answer, onEdit }: PropTypes) => {
  const [text, setText] = useState(answer.text);
  const [validationError, setValidationError] = useState("");
  const socket = useSocket();
  const { isLoading, fetchData } = useAxiosAuth(
    "/answers/" + answer._id,
    "put",
    { text }
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!text) {
      setValidationError("All fields are required");
      return;
    }

    toast.promise(fetchData(), {
      loading: "Updating your answer",
      success: () => {
        socket?.emit("answerCreated");
        onEdit();
        onClick();
        return "Your answer was updated";
      },
      error: "Could not update answer",
    });
  };

  return (
    <>
      {isLoading && <Loading condition={true} />}
      <Modal>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.close}>
            <X onClick={onClick} />
          </div>
          <p className={styles.title}>Edit this answer</p>

          {validationError && <small>{validationError}</small>}

          <div className={styles.fields}>
            <div className={styles.field}>
              <textarea
                rows={8}
                placeholder="Enter answer body"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <button>Update this answer</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default EditAnswerForm;
