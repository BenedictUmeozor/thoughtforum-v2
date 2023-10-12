import { useState } from "react";
import Container from "../../layout/Container";
import styles from "./user.module.scss";
import Question from "./Question";
import Box from "./Box";
import FollowBtn from "../../components/Widgets/FollowBtn";
import { setFixedBody } from "../../utils";
import { AnimatePresence } from "framer-motion";
import UserModal from "../../components/UserModal";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("Followers");

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
              <Box>
                <div className={styles.user}>
                  <div className={styles.flex}>
                    <div className={styles.avatar}>B</div>
                    <FollowBtn />
                  </div>
                  <div className={styles.socials}>
                    <p onClick={showFollowers}>
                      <span>4 </span>followers
                    </p>
                    <p onClick={showFollowing}>
                      <span>4 </span>following
                    </p>
                  </div>
                  <p className={styles.joined}>Joined: 11th October, 2023</p>
                </div>
              </Box>
              <Box>
                <h3>Personal Information</h3>
                <div className={styles.detail}>
                  <p>Name:</p>
                  <p>Benedict</p>
                </div>
                <div className={styles.detail}>
                  <p>Bio:</p>
                  <p>Benedict</p>
                </div>
                <div className={styles.detail}>
                  <p>Email:</p>
                  <p>Benedict</p>
                </div>
                <div className={styles.detail}>
                  <p>Gender:</p>
                  <p>Benedict</p>
                </div>
              </Box>
            </div>
            <div className={styles.right}>
              <Box>
                <h3>Questions</h3>
                <div className={styles.questions}>
                  <Question />
                  <Question />
                  <Question />
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
