import { NavLink, useNavigate, useParams } from "react-router-dom";
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
import { useAxiosInstance } from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { Category, Question as QuestionType } from "../../helpers/types";
import { Skeleton } from "@mui/material";

const Categories = () => {
  const { id } = useParams();
  const categories = useAppSelector((state) => state.categories);
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryQuestions, setCategoryQuestions] = useState<
    QuestionType[] | null
  >(null);

  const { error, fetchData } = useAxiosInstance("/questions/category/" + id);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
      navigate("/error-page");
    }
  }, [error]);

  useEffect(() => {
    const setData = async () => {
      const data = await fetchData();
      setCategoryQuestions(data);
      setCategory(categories.find((c) => c._id === id)!);
    };
    setData();
  }, [categories, id]);

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <MobileDiv>
            <QuestionBox />
          </MobileDiv>
          <div className={styles.categories}>
            {categories.map((category) => (
              <NavLink
                to={"/categories/" + category._id}
                key={category._id}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {category.title}
              </NavLink>
            ))}
          </div>
          <div className={styles.page}>
            <h3 className={styles.title}>{category?.title}</h3>

            <div className={styles.questions}>
              {!categoryQuestions ? (
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
              ) : categoryQuestions?.length ? (
                <>
                  {categoryQuestions?.map((question) => (
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
