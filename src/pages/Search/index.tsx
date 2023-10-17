import HotQuestions from "../../components/HotQuestions";
import TopMembers from "../../components/TopMembers";
import Container from "../../layout/Container";
import { useState, useEffect } from "react";
import styles from "./search.module.scss";
import { Search } from "react-feather";
import { useAppSelector, useQuestionContext } from "../../hooks";
import { Question as QuestionType } from "../../helpers/types";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Question from "../../components/Question";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<QuestionType[] | null>(null);
  const questions = useAppSelector((state) => state.questions);
  const { setAppQuestions } = useQuestionContext();

  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("search");

  useEffect(() => {
    if (paramValue) {
      setSearchTerm(paramValue);
    }
  }, [paramValue]);

  const getResult = () => {
    if (!searchTerm) {
      setResult([]);
      return toast.error("You need to enter a search");
    }

    setResult(null);

    const searched = questions.filter((question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    setResult(searched);
  };

  useEffect(() => {
    if (searchTerm) {
      getResult();
    } else {
      setResult([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    setAppQuestions();
  }, [searchTerm, paramValue]);

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <div className={styles.search}>
            <h2>Enter your search:</h2>
            <div className={styles.searchBar}>
              <Search />
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <p className={styles.count}>
            Showing <span>{result?.length}</span>{" "}
            {result?.length === 1 ? "result" : "results"}
          </p>

          {result && searchTerm && result.length === 0 && (
            <div className={styles.results}>
              <p className={styles.text}>
                No results returned for <span>{searchTerm}</span>
              </p>
            </div>
          )}

          {result && result.length > 0 && (
            <div className={styles.results}>
              {result.map((question) => (
                <Question key={question._id} question={question} />
              ))}
            </div>
          )}
        </div>
        <div className={styles.right}>
          <HotQuestions />
          <TopMembers />
        </div>
      </Container>
    </main>
  );
};
export default SearchPage;
