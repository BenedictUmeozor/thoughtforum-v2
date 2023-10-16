import { TrendingDown } from "react-feather";
import Question from "./Question";
import styles from "./related.module.scss";
import { useState, useEffect } from "react";
import { RelatedQuestion } from "../../helpers/types";
import { useAxiosInstance } from "../../hooks/useAxios";
import { Skeleton } from "@mui/material";

type PropTypes = {
  id: string | undefined;
  category: string | undefined;
};

const RelatedQuestions = ({ category, id }: PropTypes) => {
  const [questions, setQuestions] = useState<RelatedQuestion[] | null>(null);
  const { error, fetchData, isLoading } = useAxiosInstance(
    "/questions/related-questions/" + category
  );

  useEffect(() => {
    const getQuestions = async () => {
      const questions: RelatedQuestion[] = await fetchData();
      const filteredQuestions: RelatedQuestion[] = questions.filter(
        (q) => q._id !== id
      );
      setQuestions(filteredQuestions);
    };
    getQuestions();
  }, [category, id]);

  return (
    <div className={styles.div}>
      <h3 className={styles.title}>
        <TrendingDown /> Related Questions
      </h3>
      <div className={styles.questions}>
        {error && <p>Something went wrong</p>}
        {!error && isLoading ? (
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
        ) : questions?.length ? (
          questions.map((question) => (
            <Question key={question._id} question={question} />
          ))
        ) : (
          <p style={{padding: "0.75rem"}} className="center-text">No questions to show</p>
        )}
      </div>
    </div>
  );
};
export default RelatedQuestions;
