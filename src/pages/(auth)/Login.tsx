import { useState, FormEvent, useEffect } from "react";
import Container from "../../layout/Container";
import styles from "./auth.module.scss";
import image from "../../assets/signin.svg";
import { ChevronRight } from "react-feather";
import UnprotectedLayout from "../../layout/UnprotectedLayout";
import { useAppDispatch, useSocket } from "../../hooks";
import toast from "react-hot-toast";
import { Auth } from "../../helpers/types";
import { setCredentials } from "../../features/AuthSlice";
import { useAxiosInstance } from "../../hooks/useAxios";
import Loading from "../../layout/Backdrop";

const Login = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { fetchData, isLoading, error } = useAxiosInstance(
    "/auth/login",
    "post",
    formData
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    const data: Auth = await fetchData();
    if (data) {
      dispatch(setCredentials(data));
      socket?.emit("login", data._id);
      return toast.success("Logged in successfully");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {isLoading && <Loading condition={true} />}
      <UnprotectedLayout className={styles.section}>
        <Container className={styles.container}>
          <div className={styles.left}>
            <img src={image} alt="Sign in to your Account" />
          </div>
          <div className={styles.right}>
            <h2>Welcome Back!</h2>
            <p>
              Welcome to <span>ThoughtForum</span>. Lorem ipsum dolor sit amet.
            </p>
            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className={styles.line}></div>
              </div>

              <div className={styles.field}>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className={styles.line}></div>
              </div>
              <button type="submit">
                Continue <ChevronRight />
              </button>
            </form>
          </div>
        </Container>
      </UnprotectedLayout>
    </>
  );
};
export default Login;
