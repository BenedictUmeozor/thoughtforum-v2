import { Link } from "react-router-dom";
import { SetStateAction, useState, useEffect } from "react";
import Avatar from "../Avatar";
import styles from "./answer.module.scss";
import { Edit2, Heart, MoreVertical, Trash2 } from "react-feather";
import { AnimatePresence } from "framer-motion";
import { setFixedBody } from "../../utils";
import EditAnswerForm from "../Forms/EditAnswerForm";
import { Answer as AnswerType } from "../../helpers/types";
import { formatRFC7231 } from "date-fns";
import { useAppSelector } from "../../hooks";
import { useAxiosAuth, useAxiosInstance } from "../../hooks/useAxios";
import toast from "react-hot-toast";

type PropTypes = {
  answer: AnswerType;
  id: string;
  refetch: () => void;
  setAnswers: (value: SetStateAction<AnswerType[] | null>) => void;
};

const Answer = ({ answer, id, setAnswers, refetch }: PropTypes) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);

  const {
    isLoading: likeLoading,
    fetchData: likeAnswer,
    error: likeError,
  } = useAxiosAuth("/answers/" + answer._id, "post");
  const { fetchData: getAnswers } = useAxiosInstance("/answers/" + id);

  const {
    isLoading: deleteLoading,
    error: deleteError,
    fetchData: deleteAnswer,
  } = useAxiosAuth("/answers/" + answer._id, "delete");

  const fetchAnswers = async () => {
    const answers: AnswerType[] = await getAnswers();
    setAnswers(answers);
  };

  const onLike = async () => {
    if (!_id) {
      toast.error("You need to be logged in");
      return;
    }
    const promise = await likeAnswer();

    if (promise) {
      await fetchAnswers();
    }
  };

  const onDelete = async () => {
    if (!_id) {
      toast.error("You need to be logged in");
      return;
    }
    const promise = await deleteAnswer();

    if (promise) {
      await refetch();
      toast.success("Answer deleted");
    }
  };

  const displayForm = () => {
    setShowForm(true);
    setShowMenu(false);
    setFixedBody(true);
  };

  const hideForm = () => {
    setShowForm(false);
    setShowMenu(false);
    setFixedBody(false);
  };

  useEffect(() => {
    if (likeError || deleteError) {
      toast.error("Something went wrong");
    }
  }, [likeError, deleteError]);

  return (
    <>
      <AnimatePresence>
        {showForm && (
          <EditAnswerForm
            answer={answer}
            onEdit={fetchAnswers}
            onClick={hideForm}
          />
        )}
      </AnimatePresence>
      <div className={styles.answer}>
        <header>
          <div className={styles.user}>
            <Avatar />
            <Link to={"/user/" + answer.user._id}>
              <h3>{answer.user.name}</h3>
            </Link>
          </div>
          {_id && answer.user._id === _id && (
            <div
              className={styles.ellipsis}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <MoreVertical />
              {showMenu && (
                <div className={styles.div}>
                  <div onClick={displayForm}>
                    Edit <Edit2 />
                  </div>
                  <div
                    onClick={onDelete}
                    style={{
                      opacity: deleteLoading ? 0.5 : 1,
                      pointerEvents: deleteLoading ? "none" : "all",
                    }}
                  >
                    Delete <Trash2 />
                  </div>
                </div>
              )}
            </div>
          )}
        </header>
        <div className={styles.body}>
          <p>{answer.text}</p>
          <small>Answered: {formatRFC7231(new Date(answer.createdAt))}</small>
        </div>
        <footer>
          <div className={styles.action}>
            <div>
              <Heart
                fill={_id && answer.likes.includes(_id) ? "crimson" : "white"}
                stroke={
                  _id && answer.likes.includes(_id) ? "crimson" : "currentColor"
                }
                style={{
                  opacity: likeLoading ? 0.5 : 1,
                  pointerEvents: likeLoading ? "none" : "all",
                }}
                onClick={onLike}
              />
              <p>{answer.likes.length}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Answer;
