import { Link } from "react-router-dom";
import { useState } from "react";
import Avatar from "../Avatar";
import styles from "./answer.module.scss";
import { Edit2, Heart, MoreVertical, Trash2 } from "react-feather";

const Answer = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.answer}>
      <header>
        <div className={styles.user}>
          <Avatar />
          <Link to={"/"}>
            <h3>Benedict Umeozor</h3>
          </Link>
        </div>
        <div
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
        </div>
      </header>
      <div className={styles.body}>
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
        </div>
      </footer>
    </div>
  );
};
export default Answer;
