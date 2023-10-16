import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TopMembers from "../../components/TopMembers";
import Container from "../../layout/Container";
import styles from "./questions.module.scss";
import {
  Edit2,
  Heart,
  MessageCircle,
  MessageSquare,
  MoreVertical,
  Trash2,
} from "react-feather";
import FollowBtn from "../../components/Widgets/FollowBtn";
import Avatar from "../../components/Avatar";
import Answer from "../../components/Answer";
import RelatedQuestions from "../../components/RelatedQuestions";
import AddAnswerForm from "../../components/Forms/AddAnswerForm";
import { setFixedBody } from "../../utils";
import { useAxiosAuth, useAxiosInstance } from "../../hooks/useAxios";
import { Answer as AnswerType, Question } from "../../helpers/types";
import { Skeleton } from "@mui/material";
import { useAppSelector, useSocket } from "../../hooks";
import { formatRFC7231 } from "date-fns";
import toast from "react-hot-toast";
import EditQuestionForm from "../../components/Forms/EditQuestionForm";

const Questions = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<AnswerType[] | null>(null);
  const { id } = useParams();
  const { _id: userId } = useAppSelector((state) => state.auth);
  const socket = useSocket();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const { fetchData: getQuestion } = useAxiosInstance("/questions/" + id);
  const { fetchData: getAnswers } = useAxiosInstance("/answers/" + id);
  const {
    fetchData: likeQuestion,
    isLoading: likeLoading,
    error: likeError,
  } = useAxiosAuth("/questions/like/" + question?._id, "post");
  const {
    fetchData: followUser,
    isLoading: followLoading,
    error: followError,
  } = useAxiosAuth("/users/" + question?.user._id, "post");

  const {
    fetchData: deleteQuestion,
    isLoading: deleteLoading,
    error: deleteError,
  } = useAxiosAuth("/questions/" + question?._id, "delete");

  const onDelete = async () => {
    if (!userId) {
      toast.error("You need to be logged in");
      return;
    }

    const promise = await deleteQuestion();

    if (promise) {
      navigate("/");
      toast.success("Your question was deleted");
    }
  };

  const onFollow = async () => {
    if (!userId) {
      toast.error("You need to be logged in");
      return;
    }

    const promise = await followUser();

    if (promise) {
      const question: Question = await getQuestion();
      setQuestion(question);
      const text = question?.user.followers.includes(userId!)
        ? `You are now following ${question?.user.name}`
        : `You are now unfollowing ${question?.user.name}`;
      toast.success(text);
      if (!question?.user.followers.includes(userId!)) {
        socket?.emit("follow", { _id: question?.user._id, name: user?.name });
      }
    }

    if (followError) {
      toast.error("Something went wrong");
    }
  };

  const onLike = async () => {
    if (!userId) {
      toast.error("You need to be logged in");
      return;
    }

    const promise = await likeQuestion();
    if (promise) {
      const question: Question = await getQuestion();
      setQuestion(question);
    }

    if (likeError) {
      toast.error("Something went wrong");
    }
  };

  const displayForm = () => {
    setShowAddForm(true);
    setFixedBody(true);
  };

  const hideForm = () => {
    setShowAddForm(false);
    setFixedBody(false);
  };

  const displayEditForm = () => {
    setShowForm(true);
    setShowMenu(false);
    setFixedBody(true);
  };

  const hideEditForm = () => {
    setShowForm(false);
    setShowMenu(false);
    setFixedBody(false);
  };

  const refetchQuestion = async () => {
    const question: Question = await getQuestion();
    setQuestion(question);
  };

  useEffect(() => {
    const getData = async () => {
      const question: Question = await getQuestion();
      const answers: AnswerType[] = await getAnswers();
      setQuestion(question);
      setAnswers(answers);
    };
    getData();
  }, []);

  useEffect(() => {
    if (deleteError) {
      toast.error("Something went wrong");
    }
  }, [deleteError, deleteLoading]);

  return (
    <>
      <AnimatePresence>
        {showAddForm && <AddAnswerForm onClick={hideForm} />}
      </AnimatePresence>
      <AnimatePresence>
        {showForm && (
          <EditQuestionForm
            question={question!}
            key={"edit-question-form-" + question?._id}
            onClick={hideEditForm}
            onEdit={refetchQuestion}
          />
        )}
      </AnimatePresence>
      <main className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.left}>
            {question ? (
              <>
                <div className={styles.question}>
                  <header>
                    <div className={styles.user}>
                      <Avatar name={question.user.name} />
                      <Link to={"/user/" + question.user._id}>
                        <h3>{question.user.name}</h3>
                      </Link>
                    </div>
                    {question.user._id === userId ? (
                      <>
                        <div
                          className={styles.ellipsis}
                          onClick={() => setShowMenu((prev) => !prev)}
                        >
                          <MoreVertical />

                          {showMenu && (
                            <div className={styles.div}>
                              <div onClick={displayEditForm}>
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
                        </div>{" "}
                      </>
                    ) : (
                      <FollowBtn
                        isFollowing={question.user.followers.includes(userId!)}
                        onFollow={onFollow}
                        isLoading={followLoading}
                      />
                    )}
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
                    <p>{question.body}</p>
                    <small>
                      Asked: {formatRFC7231(new Date(question.createdAt))}
                    </small>
                  </div>
                  <footer>
                    <div className={styles.action}>
                      <div>
                        <Heart
                          fill={
                            userId && question.likes.includes(userId)
                              ? "crimson"
                              : "none"
                          }
                          stroke={
                            userId && question.likes.includes(userId)
                              ? "crimson"
                              : "currentColor"
                          }
                          onClick={onLike}
                          style={{
                            opacity: likeLoading ? 0.5 : 1,
                            pointerEvents: likeLoading ? "none" : "all",
                          }}
                        />
                        <p>{question.likes.length}</p>
                      </div>
                      <div>
                        <MessageSquare />
                        <p>{question.answers.length}</p>
                      </div>
                    </div>
                    <button className={styles.answer} onClick={displayForm}>
                      <MessageCircle />
                      Answer
                    </button>
                  </footer>
                </div>
              </>
            ) : (
              <>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={200}
                  style={{ marginBottom: "1rem" }}
                />
              </>
            )}

            <div className={styles.stats}>
              Showing {question?.answers.length}{" "}
              {question?.answers.length === 1 ? "answer" : "answers"}
            </div>

            <div className={styles.answers}>
              {answers ? (
                !answers.length ? (
                  <p className="center-text">No answers to show</p>
                ) : (
                  answers.map((answer) => (
                    <Answer
                      key={answer._id}
                      answer={answer}
                      id={id!}
                      setAnswers={setAnswers}
                    />
                  ))
                )
              ) : (
                <>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={200}
                    style={{ marginBottom: "1rem" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={200}
                    style={{ marginBottom: "1rem" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={200}
                    style={{ marginBottom: "1rem" }}
                  />
                </>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <RelatedQuestions
              category={question?.category._id}
              id={question?._id}
            />
            <TopMembers />
          </div>
        </Container>
      </main>
    </>
  );
};
export default Questions;
