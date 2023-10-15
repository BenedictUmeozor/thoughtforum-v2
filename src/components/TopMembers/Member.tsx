import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import FollowBtn from "../Widgets/FollowBtn";
import styles from "./top.module.scss";
import { Hash } from "react-feather";
import { MemberType } from ".";
import { useAppSelector } from "../../hooks";
import toast from "react-hot-toast";
import { axiosAuth } from "../../libs/axios";

type PropTypes = {
  member: MemberType;
  onFollow: () => void;
};

const Member = ({ member, onFollow }: PropTypes) => {
  const { _id } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const follow = () => {
    setLoading(true);
    setError(false);
    axiosAuth
      .post("/users/" + member._id)
      .then(() => onFollow())
      .then(() =>
        toast.success(
          member?.followers.includes(_id!)
            ? `You have unfollowed ${member?.name}`
            : `You are now following ${member?.name}`
        )
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const followUser = async () => {
    if (!_id) {
      toast.error("You need to be logged in");
      return;
    }

    await follow();
    await onFollow();
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  return (
    <div className={styles.member}>
      <header>
        <Link to={"/user/" + member._id} className={styles.user}>
          <Avatar />
          <h3>{member.name}</h3>
        </Link>
        {_id && member._id !== _id && (
          <FollowBtn
            isFollowing={member.followers.includes(_id)}
            onFollow={followUser}
            isLoading={loading}
          />
        )}
      </header>
      <footer>
        <Link to={"/user/" + member._id}>
          <Hash />
          <span>
            {member.questions.length}{" "}
            {member.questions.length === 1 ? "question" : "questions"}
          </span>
        </Link>
      </footer>
    </div>
  );
};
export default Member;
