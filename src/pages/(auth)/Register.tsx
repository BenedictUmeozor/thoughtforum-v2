import { useState, FormEvent, useEffect } from "react";
import Container from "../../layout/Container";
import styles from "./auth.module.scss";
import image from "../../assets/singup.svg";
import { ChevronRight } from "react-feather";
import UnprotectedLayout from "../../layout/UnprotectedLayout";
import { useAxiosInstance } from "../../hooks/useAxios";
import { toast } from "react-hot-toast";
import { useAppDispatch, useSocket } from "../../hooks";
import { setCredentials } from "../../features/AuthSlice";
import { Auth } from "../../helpers/types";
import Loading from "../../layout/Backdrop";

const Register = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    password: "",
  });

  const { fetchData, isLoading, error } = useAxiosInstance(
    "/auth",
    "post",
    formData
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      return toast.error("All fields are required");
    }

    toast.promise(fetchData(), {
      loading: "Signing up...",
      success: (data: Auth) => {
        dispatch(setCredentials(data));
        socket?.emit("login", data._id);
        return "Registered successfully";
      },
      error: "Registration failed",
    });
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
            <img src={image} alt="Create an Account" />
          </div>
          <div className={styles.right}>
            <h2>Create an account</h2>
            <p>
              Welcome to <span>ThoughtForum</span>. Lorem ipsum dolor sit amet.
            </p>
            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <div className={styles.line}></div>
              </div>
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
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
              <button disabled={isLoading} type="submit">
                Continue <ChevronRight />
              </button>
            </form>
          </div>
        </Container>
      </UnprotectedLayout>
    </>
  );
};
export default Register;
