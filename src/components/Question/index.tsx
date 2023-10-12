import styles from "./question.module.scss";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageSquare,
  Eye,
  MoreVertical,
  Trash2,
  Edit2,
} from "react-feather";
import { useState } from "react";
import Avatar from "../Avatar";
import { setFixedBody } from "../../utils";
import { AnimatePresence } from "framer-motion";
import EditQuestionForm from "../Forms/EditQuestionForm";

const Question = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const displayForm = () => {
    setShowForm(true);
    setShowMenu(false);
    setFixedBody(true);
  };

  const hideForm = () => {
    setShowForm(false);
    setShowMenu(false);
    setFixedBody(false);
  };

  return (
    <>
      <AnimatePresence>
        {showForm && <EditQuestionForm onClick={hideForm} />}
      </AnimatePresence>
      <div className={styles.question}>
        <header>
          <div className={styles.user}>
            <Avatar />
            <Link to={"/"}>
              <h3>Benedict Umeozor</h3>
            </Link>
          </div>
          <div className={styles.ellipsis}>
            <MoreVertical onClick={() => setShowMenu((prev) => !prev)} />

            {showMenu && (
              <div className={styles.div}>
                <div onClick={displayForm}>
                  Edit <Edit2 />
                </div>
                <div>
                  Delete <Trash2 />
                </div>
              </div>
            )}
          </div>
        </header>
        <p className={styles.category}>
          in <Link to={"/"}>education</Link>
        </p>
        <div className={styles.body}>
          <Link to={"/questions"}>
            <h2>Lorem ipsum dolor sit amet consectetur.</h2>
          </Link>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa non
            tempore ab odit quibusdam repudiandae, quaerat laudantium facere
            impedit ipsum.
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
          <Link to={"/"}>
            <Eye />
            See Answers
          </Link>
        </footer>
      </div>
    </>
  );
};
export default Question;
