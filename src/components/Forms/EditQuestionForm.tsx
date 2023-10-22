import { X } from "react-feather";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";
import { Question } from "../../helpers/types";
import { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useAxiosAuth, useAxiosInstance } from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { setQuestions } from "../../features/QuestionSlice";
import Loading from "../../layout/Backdrop";

type PropTypes = {
  onClick: () => void;
  onEdit?: () => void;
  question: Question;
};

const EditQuestionForm = ({ onClick, question, onEdit }: PropTypes) => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const [validationError, setValidationError] = useState("");
  const [formData, setFormdata] = useState({
    title: question.title,
    category: question.category._id,
    body: question.body,
  });

  const { isLoading, fetchData: editQuestion } = useAxiosAuth(
    "/questions/" + question._id,
    "put",
    { ...formData }
  );

  const { fetchData: getQuestions } = useAxiosInstance("/questions");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!formData.body || !formData.category || !formData.title) {
      setValidationError("all fields are required");
      return;
    }

    toast.promise(editQuestion(), {
      loading: "Updating your answer",
      success: () => {
        getQuestions().then((questions) => {
          dispatch(setQuestions(questions));
        });
        if (onEdit) {
          onEdit();
        }
        onClick();
        return "Your question was updated";
      },
      error: "Failed to update question",
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
          <p className={styles.title}>Edit Question</p>

          {validationError && <small>{validationError}</small>}

          <div className={styles.fields}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormdata({ ...formData, title: e.target.value })
                }
              />
              <div className={styles.line}></div>
            </div>
            <div className={styles.field}>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormdata({ ...formData, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <div className={styles.line}></div>
            </div>
            <div className={styles.field}>
              <textarea
                rows={8}
                placeholder="Enter question body"
                value={formData.body}
                onChange={(e) =>
                  setFormdata({ ...formData, body: e.target.value })
                }
              ></textarea>
              <div className={styles.line}></div>
            </div>
            <button>Update question</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default EditQuestionForm;
