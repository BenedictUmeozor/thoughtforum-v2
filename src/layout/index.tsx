import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";
import {
  useAppDispatch,
  useAppSelector,
  useQuestionContext,
  useSocket,
  useThemeContext,
} from "../hooks";
import { Suspense, useEffect } from "react";
import { getTheme } from "../utils";
import Loader from "./Loader";
import Footer from "../components/Footer";
import { Toaster, ToastBar } from "react-hot-toast";
import { axiosAuth } from "../libs/axios";
import { useAuthRefresh } from "../hooks/useAuthRefresh";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { deleteCredentials, setCredentials } from "../features/AuthSlice";
import { Category } from "../helpers/types";
import { useAxiosInstance } from "../hooks/useAxios";
import { setCategories } from "../features/CategoriesSlice";
import { deleteUser, setUser } from "../features/UserSlice";
import { X } from "react-feather";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  const { _setTheme } = useThemeContext();
  const { _id } = useAppSelector((state) => state.auth);
  const { error: contextError, setAppQuestions } = useQuestionContext();
  const { getData, error } = useAuthRefresh();
  const { theme } = useThemeContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  const { fetchData } = useAxiosInstance("/categories");

  useEffect(() => {
    const getData = async () => {
      const data: Category[] = await fetchData();
      dispatch(setCategories(data));
      await setAppQuestions();
    };

    getData();
  }, []);

  useEffect(() => {
    if (socket && _id) {
      socket.emit("login", _id);
    }
  }, [socket, _id]);

  useEffect(() => {
    socket?.on("like", (user) => {
      const text = user
        ? user + " liked your question"
        : "a user liked your question";
      toast.success(text);
      console.log(user);
    });

    socket?.on("answer", (user) => {
      const text = user
        ? user + " answered your question"
        : "a user answered your question";
      toast.success(text);
      console.log(user);
    });

    socket?.on("follow", (user) => {
      const text = user
        ? user + " started following you"
        : "a user started following you";
      toast.success(text);
      console.log(user);
    });
  }, [socket]);

  useEffect(() => {
    const { theme } = getTheme();
    _setTheme(theme);
  }, [_setTheme]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axiosAuth.get("/users");
      dispatch(setUser(data));
    };
    getUser();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(deleteCredentials());
      toast.error("Session expired, please login again");
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (contextError) {
      navigate("/error-page");
      toast.error("Something went wrong");
    }
  }, [contextError]);

  axiosAuth.interceptors.request.use(
    async (config) => {
      try {
        if (!localStorage.getItem("accessToken")) {
          dispatch(deleteCredentials());
          dispatch(deleteUser());
          navigate("/login");
          throw new Error("Access token not found in local storage");
        }

        const accessToken = JSON.parse(localStorage.getItem("accessToken")!);

        if (!accessToken) {
          dispatch(deleteCredentials());
          dispatch(deleteUser());
          navigate("/login");
          throw new Error("Access token not found in local storage");
        }

        const expirationTime = jwt_decode<{
          _id: string;
          iat: number;
          exp: number;
        }>(accessToken).exp;

        if (expirationTime * 1000 < Date.now()) {
          const data = await getData();
          if (!data) {
            dispatch(deleteCredentials());
            dispatch(deleteUser());
            navigate("/login");
            throw new Error("Token refresh failed or no data returned");
          }

          dispatch(setCredentials(data));

          config.headers.Authorization = JSON.parse(accessToken);
        } else {
          config.headers.Authorization = "Bearer " + accessToken;
        }

        return config;
      } catch (error) {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosAuth.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <ScrollToTop />
      <main className={styles.main}>
        <Header />
        <section>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </section>
        <Footer />
      </main>
      <Toaster
        toastOptions={{
          style: {
            width: "100%",
            zIndex: 99999999,
            backgroundColor: theme === "light" ? "#fff" : "#262d34",
            color: theme === "light" ? "111" : "#fefefe",
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                <div className="toast-div">
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <button
                      className="toast-btn"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      <X />
                    </button>
                  )}
                </div>
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      ;
    </>
  );
};
export default RootLayout;
