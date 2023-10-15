import { useEffect } from "react";
import HotQuestions from "../../components/HotQuestions";
import Question from "../../components/Question";
import TopMembers from "../../components/TopMembers";
import { useAppDispatch, useAppSelector } from "../../hooks";
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

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, fetchData, error } = useAxiosInstance("/questions");
  const questions = useAppSelector((state) => state.questions);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      dispatch(setQuestions(data));
    };
    getData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
      navigate("/error-page");
    }
  }, [error]);

  return (
    <>
      <main className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.left}>
            <MobileDiv>
              <QuestionBox />
            </MobileDiv>
            <div className={styles.filters}>
              <div className={`${styles.filter} ${styles.active}`}>
                <p>Recent</p>
                <div className={styles.line}></div>
              </div>
              <div className={styles.filter}>
                <p>Following</p>
                <div className={styles.line}></div>
              </div>
              <div className={styles.filter}>
                <p>Featured</p>
                <div className={styles.line}></div>
              </div>
            </div>
            <div className={styles.questions}>
              {!questions && isLoading ? (
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
              ) : questions.length ? (
                <>
                  {questions.map((question) => (
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
