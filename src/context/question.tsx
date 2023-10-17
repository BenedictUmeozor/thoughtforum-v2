import { ReactNode, createContext, useEffect, useState } from "react";
import { useAxiosInstance } from "../hooks/useAxios";
import { useAppDispatch } from "../hooks";
import { Question } from "../helpers/types";
import { setQuestions } from "../features/QuestionSlice";

export const QuestionContext = createContext<{
  setAppQuestions: () => Promise<void>;
  error: boolean;
}>({
  setAppQuestions: async () => {},
  error: false,
});

interface PropTypes {
  children: ReactNode;
}

export const QuestionContextProvider: React.FC<PropTypes> = ({ children }) => {
  const [error, setError] = useState(false);
  const { fetchData, error: fetchError } = useAxiosInstance("/questions");
  const dispatch = useAppDispatch();

  const setAppQuestions = async () => {
    setError(false);
    const questions: Question[] = await fetchData();
    dispatch(setQuestions(questions));
  };

  useEffect(() => {
    if (fetchError) {
      setError(true);
    }
  }, [fetchError]);

  return (
    <QuestionContext.Provider value={{ setAppQuestions, error }}>
      {children}
    </QuestionContext.Provider>
  );
};