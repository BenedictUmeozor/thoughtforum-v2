import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";
import {
  useAppDispatch,
  useAppSelector,
  useSocket,
  useThemeContext,
} from "../hooks";
import { Suspense, useEffect } from "react";
import { getTheme } from "../utils";
import Loader from "./Loader";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { axiosAuth } from "../libs/axios";
import { useAuthRefresh } from "../hooks/useAuthRefresh";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { deleteCredentials, setCredentials } from "../features/AuthSlice";
import { Auth, Category } from "../helpers/types";
import { useAxiosInstance } from "../hooks/useAxios";
import { setCategories } from "../features/CategoriesSlice";
import { setUser } from "../features/UserSlice";

const RootLayout = () => {
  const { _setTheme } = useThemeContext();
  const { _id } = useAppSelector((state) => state.auth);
  const { getData, error } = useAuthRefresh();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  const { fetchData } = useAxiosInstance("/categories");

  useEffect(() => {
    const getData = async () => {
      const data: Category[] = await fetchData();
      dispatch(setCategories(data));
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
      toast.success(user + " liked your question");
    });

    socket?.on("answer", (user) => {
      toast.success(user + " answered your question");
    });

    socket?.on("follow", (user) => {
      toast.success(user + " started following you");
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

  axiosAuth.interceptors.request.use(
    async (config) => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);

      const expirationTime = jwt_decode<{
        _id: string;
        iat: number;
        exp: number;
      }>(accessToken).exp;

      if (expirationTime * 1000 < Date.now()) {
        const data: Auth = await getData();
        dispatch(setCredentials(data));

        config.headers.Authorization = JSON.parse(
          localStorage.getItem("accessToken")!
        );
      } else {
        config.headers.Authorization = "Bearer " + accessToken;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosAuth.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        dispatch(deleteCredentials());
        navigate("/login");
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <main className={styles.main}>
        <Header />
        <section>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </section>
        <Footer />
      </main>
      <Toaster toastOptions={{ style: { width: "100%" } }} />
    </>
  );
};
export default RootLayout;
