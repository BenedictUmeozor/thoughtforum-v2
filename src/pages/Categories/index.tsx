import { useEffect, useState } from "react";
import HotQuestions from "../../components/HotQuestions";
import Question from "../../components/Question";
import TopMembers from "../../components/TopMembers";
import Container from "../../layout/Container";
import DesktopDiv from "../../layout/DesktopDiv";
import MobileDiv from "../../layout/MobileDiv";
import QuestionBox from "../Home/QuestionBox";
import styles from "./categories.module.scss";
import { useAppSelector } from "../../hooks";
import { Category, Question as QuestionType } from "../../helpers/types";
import { Skeleton } from "@mui/material";

const Categories = () => {
  const categories = useAppSelector((state) => state.categories);
  const questions = useAppSelector((state) => state.questions);
  const [selected, setSelected] = useState(
    categories && categories.length > 0 ? categories[0]._id : null
  );

  const [category, setCategory] = useState<Category | null>(null);
  const [categoryQuestions, setCategoryQuestions] = useState<
    QuestionType[] | null
  >(null);

  const filter = (param: string) => {
    setSelected(param);
    setCategoryQuestions(
      [...questions].filter(
        (question) => question.category && question.category._id === param
      )
    );
    const category = categories.find((c) => c._id === param);
    if (category) {
      setCategory(category);
    }
  };

  useEffect(() => {
    if (categories && categories.length) {
      setSelected(categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    if (questions && selected && categories) {
      setCategoryQuestions(
        [...questions].filter((question) => question.category._id === selected)
      );
    }
  }, [questions, selected, categories]);

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <MobileDiv>
            <QuestionBox />
          </MobileDiv>
          <div className={styles.categories}>
            {categories &&
              categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => filter(category._id)}
                  className={selected === category._id ? styles.active : ""}
                >
                  {category.title}
                </button>
              ))}
          </div>
          <div className={styles.page}>
            {category && <h3 className={styles.title}>{category.title}</h3>}

            <div className={styles.questions}>
              {!categoryQuestions || !selected ? (
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
                </>
              ) : categoryQuestions.length ? (
                <>
                  {categoryQuestions.map((question) => (
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
  );
};
export default Categories;
