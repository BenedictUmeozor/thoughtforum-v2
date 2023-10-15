import styles from "./question.module.scss";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageSquare,
  Eye,
  MoreVertical,
  Trash2,
  Edit2,
} from "react-feather";
import { useState } from "react";
import Avatar from "../Avatar";
import { setFixedBody } from "../../utils";
import { AnimatePresence } from "framer-motion";
import EditQuestionForm from "../Forms/EditQuestionForm";
import LikesModal from "../UserModal/LikesModal";
import { Question as QuestionType } from "../../helpers/types";
import { formatRFC7231 } from "date-fns";
import { useAppDispatch, useAppSelector, useSocket } from "../../hooks";
import { useAxiosAuth, useAxiosInstance } from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { setQuestions } from "../../features/QuestionSlice";

const Question = ({ question }: { question: QuestionType }) => {
  const { _id } = useAppSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const { fetchData: likeFetch, isLoading: likeLoading } = useAxiosAuth(
    "/questions/like/" + question._id,
    "post"
  );
  const { fetchData } = useAxiosInstance("/questions");
  const socket = useSocket();

  const likeQuestion = async () => {
    if (!_id) {
      toast.error("You need to be logged in");
      return;
    }
    const data = await likeFetch();
    if (data) {
      if (question._id !== _id) {
        if (!question.likes.includes(_id)) {
          socket?.emit("like", {
            _id: question.user._id,
            type: "question",
            name: user?.name,
          });
        }
      }
      const questions = await fetchData();
      dispatch(setQuestions(questions));
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

  const displayLikes = () => {
    setShowLikes(true);
    setFixedBody(true);
  };

  const hideLikes = () => {
    setShowLikes(false);
    setFixedBody(false);
  };

  return (
    <>
      <AnimatePresence>
        {showForm && <EditQuestionForm onClick={hideForm} />}
      </AnimatePresence>
      <AnimatePresence>
        {showLikes && <LikesModal onClose={hideLikes} />}
      </AnimatePresence>
      <div className={styles.question}>
        <header>
          <div className={styles.user}>
            <Avatar name={question.user.name} />
            <Link to={"/user/" + question.user._id}>
              <h3>{question.user.name}</h3>
            </Link>
          </div>
          <div className={styles.ellipsis}>
            {question.user._id === _id && (
              <MoreVertical onClick={() => setShowMenu((prev) => !prev)} />
            )}

            {showMenu && (
              <div className={styles.div}>
                <div onClick={displayForm}>
                  Edit <Edit2 />
                </div>
                <div>
                  Delete <Trash2 />
                </div>
              </div>
            )}
          </div>
        </header>
        <p className={styles.category}>
          in{" "}
          <Link to={"/categories/" + question.category._id}>
            {question.category.title}
          </Link>
        </p>
        <div className={styles.body}>
          <Link to={"/questions/" + question._id}>
            <h2>{question.title}</h2>
          </Link>
          <p>
            {question.body.substring(0, 120) +
              [
                question.body.length > question.body.substring(0, 120).length
                  ? "..."
                  : "",
              ]}
          </p>
          <small>Asked: {formatRFC7231(new Date(question.createdAt))}</small>
        </div>
        <footer>
          <div className={styles.action}>
            <div>
              <Heart
                fill={_id && question.likes.includes(_id) ? "crimson" : "none"}
                stroke={
                  _id && question.likes.includes(_id)
                    ? "crimson"
                    : "currentColor"
                }
                style={{
                  opacity: likeLoading ? 0.5 : 1,
                  pointerEvents: likeLoading ? "none" : "all",
                }}
                onClick={likeQuestion}
              />
              <p onClick={displayLikes}>{question.likes.length}</p>
            </div>
            <div>
              <MessageSquare />
              <p>{question.answers.length}</p>
            </div>
          </div>
          <Link to={"/questions/" + question._id}>
            <Eye />
            See Answers
          </Link>
        </footer>
      </div>
    </>
  );
};
export default Question;
