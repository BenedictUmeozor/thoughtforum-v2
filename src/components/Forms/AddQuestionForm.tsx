import { X } from "react-feather";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";
import { useState, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector, useSocket } from "../../hooks";
import toast from "react-hot-toast";
import { useAxiosAuth, useAxiosInstance } from "../../hooks/useAxios";
import Loading from "../../layout/Backdrop";
import { setQuestions } from "../../features/QuestionSlice";

type PropTypes = {
  onClick: () => void;
};

const AddQuestionForm = ({ onClick }: PropTypes) => {
  const categories = useAppSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    title: "",
    category: categories[0]?._id,
    body: "",
  });
  const [validationError, setValidationError] = useState("");
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const {
    error,
    fetchData: createQuestion,
    isLoading,
  } = useAxiosAuth("/questions", "post", formData);
  const { fetchData: getQuestions } = useAxiosInstance("/questions");

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");
    if (!formData.body || !formData.category || !formData.title) {
      setValidationError("All fields are required");
      return;
    }
    const promise = await createQuestion();
    if (promise) {
      socket?.emit("questionCreated");
      const questions = await getQuestions();
      dispatch(setQuestions(questions));
      onClick();
      return toast.success("Your question was posted");
    }
  };

  useEffect(() => {
    if (error) {
      onClick();
      toast.error("Something went wrong");
    }
  }, []);

  return (
    <>
      {isLoading && <Loading condition={true} />}
      <Modal>
        <form className={styles.form} onSubmit={submitForm}>
          <div className={styles.close}>
            <X onClick={onClick} />
          </div>
          <p className={styles.title}>Create Question</p>

          {validationError && <small>{validationError}</small>}

          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Title:</label>
              <input
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <label>Category:</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Body:</label>
              <textarea
                rows={8}
                placeholder="Enter question body"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
              ></textarea>
            </div>
            <button>Create question</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default AddQuestionForm;
