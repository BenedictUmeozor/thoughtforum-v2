import { X } from "react-feather";
import { useState, FormEvent } from "react";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";
import { useAxiosAuth } from "../../hooks/useAxios";
import { useAppSelector, useSocket } from "../../hooks";
import toast from "react-hot-toast";
import Loading from "../../layout/Backdrop";

type PropTypes = {
  onClick: () => void;
  onAdd: () => Promise<void>;
  user_id: string;
  question: string;
};

const AddAnswerForm = ({ onClick, onAdd, user_id, question }: PropTypes) => {
  const [text, setText] = useState("");
  const [validationError, setValidationError] = useState("");
  const user = useAppSelector((state) => state.user);
  const { _id } = useAppSelector((state) => state.auth);
  const socket = useSocket();
  const { isLoading, fetchData: addAnswer } = useAxiosAuth("/answers", "post", {
    text,
    question,
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!text) {
      setValidationError("All fields are required");
      return;
    }

    toast.promise(addAnswer(), {
      loading: "Posting your answer...",
      success: () => {
        socket?.emit("answerCreated");
        if (_id !== user._id) {
          socket?.emit("answer", { _id: user_id, name: user.name });
        }
        onAdd();
        onClick();
        return "Your answer was posted";
      },
      error: "Could not post",
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
          <p className={styles.title}>Answer this question</p>

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
            <button>Answer</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default AddAnswerForm;
