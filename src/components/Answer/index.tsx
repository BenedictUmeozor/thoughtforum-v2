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
import LikesModal from "../UserModal/LikesModal";

type PropTypes = {
  answer: AnswerType;
  id: string;
  refetch: () => void;
  setAnswers: (value: SetStateAction<AnswerType[] | null>) => void;
};

const Answer = ({ answer, id, setAnswers, refetch }: PropTypes) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);

  const {
    isLoading: likeLoading,
    fetchData: likeAnswer,
    error: likeError,
  } = useAxiosAuth("/answers/" + answer._id, "post");
  const { fetchData: getAnswers } = useAxiosInstance("/answers/" + id);

  const { isLoading: deleteLoading, fetchData: deleteAnswer } = useAxiosAuth(
    "/answers/" + answer._id,
    "delete"
  );

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
      return toast.error("You need to be loggedin");
    }

    toast.promise(deleteAnswer(), {
      loading: "Deleting your answer...",
      success: () => {
        refetch();
        return "Answer has been deleted";
      },
      error: "Failed to delete",
    });
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

  const displayLikes = () => {
    setShowLikes(true);
    setFixedBody(true);
  };

  const hideLikes = () => {
    setShowLikes(false);
    setFixedBody(false);
  };

  useEffect(() => {
    if (likeError) {
      toast.error("Something went wrong");
    }
  }, [likeError]);

  return (
    <>
      <AnimatePresence>
        {showForm && (
          <EditAnswerForm
            answer={answer}
            key={"Edit-answer-form"}
            onEdit={fetchAnswers}
            onClick={hideForm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLikes && answer && (
          <LikesModal
            id={answer._id}
            onClose={hideLikes}
            title="answers"
            key={"likes"}
          />
        )}
      </AnimatePresence>
      <div className={styles.answer}>
        <header>
          <div className={styles.user}>
            <Avatar name={answer.user.name} />
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
                fill={_id && answer.likes.includes(_id) ? "crimson" : "none"}
                stroke={
                  _id && answer.likes.includes(_id) ? "crimson" : "currentColor"
                }
                style={{
                  opacity: likeLoading ? 0.5 : 1,
                  pointerEvents: likeLoading ? "none" : "all",
                }}
                onClick={onLike}
              />
              <p onClick={displayLikes}>{answer.likes.length}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Answer;
