import { Edit2 } from "react-feather";
import Container from "../../layout/Container";
import styles from "./user.module.scss";
import Question from "./Question";
import Box from "./Box";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { setFixedBody } from "../../utils";
import EditProfileForm from "../../components/Forms/EditProfileForm";
import UserModal from "../../components/UserModal";
import ProtectedLayout from "../../layout/ProtectedLayout";
import { Skeleton } from "@mui/material";
import UserAvatar from "./UserAvatar";
import { Question as QuestionType, UserProfile } from "../../helpers/types";
import { axiosInstance } from "../../libs/axios";
import { useAxiosAuth } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { formatRFC7231 } from "date-fns";

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [title, setTitle] = useState("Followers");
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const navigate = useNavigate();

  const { fetchData: getUser, error } = useAxiosAuth("/users");

  const displayForm = () => {
    setShowForm(true);
    setFixedBody(true);
  };

  const hideForm = () => {
    setShowForm(false);
    setFixedBody(false);
  };

  const showFollowers = () => {
    setTitle("Followers");
    setFixedBody(true);
    setShowModal(true);
  };

  const showFollowing = () => {
    setTitle("Following");
    setFixedBody(true);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setFixedBody(false);
  };

  const getQuestions = async () => {
    if (user?.questions) {
      const questionPromises = user.questions.map(async (question) => {
        const response = await axiosInstance.get("/questions/" + question);
        return response.data;
      });

      const questions = await Promise.all(questionPromises);
      setQuestions(questions.reverse());

      return questions;
    }

    setQuestions([]);
    return [];
  };

  const fetchUser = async () => {
    const user: UserProfile = await getUser();
    setUser(user);
  };

  useEffect(() => {
    if (user) {
      getQuestions();
    }
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/error-page");
    }
  }, [error]);

  return (
    <>
      <ProtectedLayout className={styles.main}>
        <AnimatePresence>
          {showForm && (
            <EditProfileForm key={"edit-profile"} setUser={setUser} onClick={hideForm} />
          )}
          {showModal && (
            <UserModal key={"user-modal"} title={title} onClose={hideModal} />
          )}
        </AnimatePresence>
        <Container>
          <h2>My Profile</h2>
          <div className={styles.container}>
            <div className={styles.left}>
              {user ? (
                <Box>
                  <div className={styles.user}>
                    <div className={styles.flex}>
                      <UserAvatar className={styles.avatar} name={user?.name} />
                      <button className={styles.edit} onClick={displayForm}>
                        Edit <Edit2 />
                      </button>
                    </div>
                    <div className={styles.socials}>
                      <p onClick={showFollowers}>
                        <span>{user.followers.length} </span>followers
                      </p>
                      <p onClick={showFollowing}>
                        <span>{user.following.length} </span>following
                      </p>
                    </div>
                    <p className={styles.joined}>
                      Joined:  {formatRFC7231(new Date(user.createdAt))}
                    </p>
                  </div>
                </Box>
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={250}
                  style={{ marginBottom: "1rem" }}
                />
              )}
              {user ? (
                <Box>
                  <h3>Personal Information</h3>
                  <div className={styles.detail}>
                    <p>Name:</p>
                    <p>{user.name}</p>
                  </div>
                  <div className={styles.detail}>
                    <p>Bio:</p>
                    <p>{user.bio}</p>
                  </div>
                  <div className={styles.detail}>
                    <p>Email:</p>
                    <p>{user.email}</p>
                  </div>
                  <div className={styles.detail}>
                    <p>Gender:</p>
                    <p>{user.gender}</p>
                  </div>
                </Box>
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={250}
                  style={{ marginBottom: "1rem" }}
                />
              )}
            </div>
            <div className={styles.right}>
              <Box>
                <h3>Questions</h3>
                <div className={styles.questions}>
                  {questions ? (
                    questions.map((question) => (
                      <Question
                        key={question._id}
                        id={user?._id}
                        question={question}
                        getQuestions={getQuestions}
                      />
                    ))
                  ) : (
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
                    </>
                  )}
                </div>
              </Box>
            </div>
          </div>
        </Container>
      </ProtectedLayout>
    </>
  );
};
export default Profile;
