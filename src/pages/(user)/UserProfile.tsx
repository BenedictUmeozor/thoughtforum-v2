import { useState, useEffect } from "react";
import Container from "../../layout/Container";
import styles from "./user.module.scss";
import Question from "./Question";
import Box from "./Box";
import FollowBtn from "../../components/Widgets/FollowBtn";
import { setFixedBody } from "../../utils";
import { AnimatePresence } from "framer-motion";
import UserModal from "../../components/UserModal";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useSocket } from "../../hooks";
import { useAxiosAuth, useAxiosInstance } from "../../hooks/useAxios";
import {
  Question as QuestionType,
  UserProfile as UserType,
} from "../../helpers/types";
import { Skeleton } from "@mui/material";
import { axiosInstance } from "../../libs/axios";
import UserAvatar from "./UserAvatar";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("Followers");
  const [user, setUser] = useState<UserType | null>(null);
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const { _id } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();

  const { fetchData: getUser } = useAxiosInstance("/users/" + id);

  const {
    fetchData: followUser,
    isLoading: followLoading,
    error: followError,
  } = useAxiosAuth("/users/" + user?._id, "post");

  const fetchUser = async () => {
    const user = await getUser();
    setUser(user);
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

  const onFollow = async () => {
    if (!_id) {
      toast.error("You need to be logged in");
      return;
    }

    const promise = await followUser();

    if (promise) {
      fetchUser().then(() => {
        const text = user?.followers.includes(_id!)
          ? `You have unfollowed ${user?.name}`
          : `You are now following ${user?.name}`;
        toast.success(text);
        if (!user?.followers.includes(_id!)) {
          socket?.emit("follow", { _id: user?._id, name: user?.name });
        }
      });
    }

    if (followError) {
      toast.error("Something went wrong");
    }
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

  useEffect(() => {
    if (user) {
      getQuestions();
    }
  }, [user]);

  useEffect(() => {
    if (_id && _id === id) {
      navigate("/profile");
    }
  }, [id, _id]);

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <UserModal key={"user-modal"} title={title} onClose={hideModal} />
        )}
      </AnimatePresence>
      <main className={styles.main}>
        <Container>
          <h2>Profile</h2>
          <div className={styles.container}>
            <div className={styles.left}>
              {user ? (
                <Box>
                  <div className={styles.user}>
                    <div className={styles.flex}>
                      <UserAvatar name={user.name} className={styles.avatar} />
                      <FollowBtn
                        isFollowing={user.followers.includes(_id!)}
                        isLoading={followLoading}
                        onFollow={onFollow}
                      />
                    </div>
                    <div className={styles.socials}>
                      <p onClick={showFollowers}>
                        <span>{user.followers.length} </span>followers
                      </p>
                      <p onClick={showFollowing}>
                        <span>{user.following.length} </span>following
                      </p>
                    </div>
                    {/* <p className={styles.joined}>Joined: 11th October, 2023</p> */}
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
                    questions.map(
                      (question) =>
                        user && (
                          <Question
                            key={question._id}
                            id={user?._id}
                            question={question}
                            getQuestions={getQuestions}
                          />
                        )
                    )
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
      </main>
    </>
  );
};
export default UserProfile;
