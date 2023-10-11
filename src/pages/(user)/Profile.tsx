import { Edit2 } from "react-feather";
import Container from "../../layout/Container";
import styles from "./user.module.scss";
import Question from "./Question";
import Box from "./Box";

const Profile = () => {
  return (
    <main className={styles.main}>
      <Container>
        <h2>My Profile</h2>
        <div className={styles.container}>
          <div className={styles.left}>
            <Box>
              <div className={styles.user}>
                <div className={styles.flex}>
                  <div className={styles.avatar}>B</div>
                  <button className={styles.edit}>
                    Edit <Edit2 />
                  </button>
                </div>
                <div className={styles.socials}>
                  <p>
                    <span>4 </span>followers
                  </p>
                  <p>
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
  );
};
export default Profile;
