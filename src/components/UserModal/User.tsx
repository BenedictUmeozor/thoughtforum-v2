import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ModalUser } from "../../helpers/types";
import Avatar from "../Avatar";
import FollowBtn from "../Widgets/FollowBtn";
import styles from "./modal.module.scss";
import { useAppSelector, useSocket } from "../../hooks";
import toast from "react-hot-toast";
import { useAxiosAuth } from "../../hooks/useAxios";

type PropTypes = {
  user: ModalUser;
  onClose: () => void;
  title: string;
  onFetch: () => Promise<void>;
};

const User = ({ onClose, onFetch, title, user }: PropTypes) => {
  const socket = useSocket();
  const { _id } = useAppSelector((state) => state.auth);
  const {
    fetchData: followUser,
    isLoading: followLoading,
    error: followError,
  } = useAxiosAuth("/users/" + user?._id, "post");

  const onFollow = async () => {
    if (!_id) {
      toast.error("You need to be logged in");
      return;
    }

    const promise = await followUser();

    if (promise) {
      onFetch().then(() => {
        const text = user?.followers.includes(_id!)
          ? `You have unfollowed ${user?.name}`
          : `You are now following ${user?.name}`;
        toast.success(text);
        if (!user?.followers.includes(_id!)) {
          socket?.emit("follow", { _id: user?._id, name: user?.name });
        }
      });
    }
  };

  useEffect(() => {
    if (followError) {
      toast.error("Something went wrong");
    }
  }, [followError]);

  return (
    <div className={styles.user}>
      <header>
        <div>
          <Avatar name={user.name} />
          <Link
            onClick={onClose}
            to={"/user/" + user._id}
            className={styles.name}
          >
            {user.name}
          </Link>
        </div>
        {title.toLowerCase() === "followers"
          ? user._id !== _id && (
              <FollowBtn
                isFollowing={user.followers.includes(_id!)}
                isLoading={followLoading}
                key={1}
                onFollow={onFollow}
              />
            )
          : user._id !== _id && (
              <FollowBtn
                isFollowing={user.following.includes(_id!)}
                isLoading={followLoading}
                key={1}
                onFollow={onFollow}
              />
            )}
      </header>
      <p className={styles.footer}>
        {user.questions.length}{" "}
        {user.questions.length === 1 ? "question" : "questions"}
      </p>
    </div>
  );
};
export default User;
