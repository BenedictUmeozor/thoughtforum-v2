import { Link } from "react-router-dom";
import TopMembers from "../../components/TopMembers";
import Container from "../../layout/Container";
import styles from "./questions.module.scss";
import { Heart, MessageCircle, MessageSquare } from "react-feather";
import FollowBtn from "../../components/Widgets/FollowBtn";
import Avatar from "../../components/Avatar";
import Answer from "../../components/Answer";
import RelatedQuestions from "../../components/RelatedQuestions";

const Questions = () => {
  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <div className={styles.question}>
            <header>
              <div className={styles.user}>
                <Avatar />
                <Link to={"/"}>
                  <h3>Benedict Umeozor</h3>
                </Link>
              </div>
              {/* <div
                className={styles.ellipsis}
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <MoreVertical />
                {showMenu && (
                  <div className={styles.div}>
                    <div>
                      Edit <Edit2 />
                    </div>
                    <div>
                      Delete <Trash2 />
                    </div>
                  </div>
                )}
              </div> */}
              <FollowBtn />
            </header>
            <p className={styles.category}>
              in <Link to={"/"}>education</Link>
            </p>
            <div className={styles.body}>
              <Link to={"/"}>
                <h2>Lorem ipsum dolor sit amet consectetur.</h2>
              </Link>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
                non tempore ab odit quibusdam repudiandae, quaerat laudantium
                facere impedit ipsum.
              </p>
              <small>Asked: 8th October, 2023</small>
            </div>
            <footer>
              <div className={styles.action}>
                <div>
                  <Heart />
                  <p>14</p>
                </div>
                <div>
                  <MessageSquare />
                  <p>14</p>
                </div>
              </div>
              <button className={styles.answer}>
                <MessageCircle />
                Answer
              </button>
            </footer>
          </div>

          <div className={styles.stats}>Showing 5 answers</div>

          <div className={styles.answers}>
            <Answer />
            <Answer />
            <Answer />
          </div>
        </div>
        <div className={styles.right}>
          <RelatedQuestions />
          <TopMembers />
        </div>
      </Container>
    </main>
  );
};
export default Questions;
