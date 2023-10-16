import { Zap } from "react-feather";
import HotQuestion from "./HotQuestion";
import styles from "./hot.module.scss";
import { useEffect, useState } from "react";
import { Question } from "../../helpers/types";
import { useAxiosInstance } from "../../hooks/useAxios";
import { Skeleton } from "@mui/material";

const HotQuestions = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const { isLoading, error, fetchData } = useAxiosInstance(
    "/questions/hot-questions"
  );

  useEffect(() => {
    const setData = async () => {
      setQuestions(await fetchData());
    };
    setData();
  }, []);

  return (
    <>
      <div className={styles.div}>
        <div className={styles.title}>
          <Zap /> <h4>Hot Questions</h4>
        </div>
        <div>
          {error ? (
            <>
              <p>Something went wrong</p>
            </>
          ) : (
            <>
              {isLoading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={150}
                    style={{ marginBottom: "1rem" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={150}
                    style={{ marginBottom: "1rem" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={150}
                    style={{ marginBottom: "1rem" }}
                  />
                </>
              ) : (
                <>
                  {questions?.length ? (
                    questions?.map((question) => (
                      <HotQuestion key={question._id} question={question} />
                    ))
                  ) : (
                    <>
                      <p className="center-text">No questions to show</p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default HotQuestions;
