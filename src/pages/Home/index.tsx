import { useEffect, useState } from "react";
import HotQuestions from "../../components/HotQuestions";
import Question from "../../components/Question";
import TopMembers from "../../components/TopMembers";
import { useAppDispatch, useAppSelector, useSocket } from "../../hooks";
import { useAxiosInstance } from "../../hooks/useAxios";
import Container from "../../layout/Container";
import DesktopDiv from "../../layout/DesktopDiv";
import MobileDiv from "../../layout/MobileDiv";
import QuestionBox from "./QuestionBox";
import styles from "./home.module.scss";
import Skeleton from "@mui/material/Skeleton";
import { setQuestions } from "../../features/QuestionSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowUp } from "react-feather";
import { AnimatePresence, motion } from "framer-motion";
import { Question as QuestionType } from "../../helpers/types";

const Home = () => {
  const [showBtn, setShowBtn] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, fetchData, error } = useAxiosInstance("/questions");
  const questions = useAppSelector((state) => state.questions);
  const navigate = useNavigate();
  const [pageQuestions, setPageQuestions] = useState<QuestionType[] | null>(
    null
  );
  const { _id } = useAppSelector((state) => state.auth);

  const [currentQuestions, setCurrentQuestions] = useState("recent");
  const socket = useSocket();

  const getData = async () => {
    const data = await fetchData();
    dispatch(setQuestions(data));
    setPageQuestions(data);
  };

  const getNewQuestions = async () => {
    await getData();
    setShowBtn(false);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const filterQuestions = async (param: string) => {
    setCurrentQuestions(param);

    if (param === "recent") {
      await getData();
    }

    if (param === "top") {
      setPageQuestions(
        [...questions].sort((a, b) => b.answers.length - a.answers.length)
      );
    }

    if (param === "following") {
      if (_id) {
        setPageQuestions(
          [...questions].filter(
            (question) =>
              question.user &&
              Array.isArray(question.user.followers) &&
              question.user.followers.includes(_id)
          )
        );
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    socket?.on("questionCreated", () => {
      setShowBtn(true);
    });
  }, [socket]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
      navigate("/error-page");
    }
  }, [error, isLoading]);

  useEffect(() => {
    filterQuestions(currentQuestions);
  }, [questions]);

  return (
    <>
      <AnimatePresence>
        {showBtn && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            className={styles.newDiv}
          >
            <button className={styles.new} onClick={getNewQuestions}>
              <ArrowUp />
              <p>New questions</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <main className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.left}>
            <MobileDiv>
              <QuestionBox />
            </MobileDiv>
            <div className={styles.filters}>
              <div
                className={`${styles.filter} ${
                  currentQuestions === "recent" ? styles.active : ""
                }`}
                onClick={() => filterQuestions("recent")}
              >
                <p>Recent</p>
                <div className={styles.line}></div>
              </div>
              <div
                className={`${styles.filter} ${
                  currentQuestions === "top" ? styles.active : ""
                }`}
                onClick={() => filterQuestions("top")}
              >
                <p>Top Questions</p>
                <div className={styles.line}></div>
              </div>
              {_id && (
                <div
                  className={`${styles.filter} ${
                    currentQuestions === "following" ? styles.active : ""
                  }`}
                  onClick={() => filterQuestions("following")}
                >
                  <p>Following</p>
                  <div className={styles.line}></div>
                </div>
              )}
            </div>
            <div className={styles.questions}>
              {error && <p>Something went wrong</p>}
              {!pageQuestions ? (
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
              ) : pageQuestions.length ? (
                <>
                  {pageQuestions.map((question) => (
                    <Question key={question._id} question={question} />
                  ))}
                </>
              ) : (
                <>
                  <div className={styles.noData}>No questions to show</div>
                </>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <DesktopDiv>
              <QuestionBox />
            </DesktopDiv>
            <HotQuestions />
            <TopMembers />
          </div>
        </Container>
      </main>
    </>
  );
};
export default Home;
