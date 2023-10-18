import { X } from "react-feather";
import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "./modal.module.scss";
import User from "./User";
import { ModalUser } from "../../helpers/types";
import { useAxiosInstance } from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

type PropTypes = {
  title: string;
  id: string | number;
  onClose: () => void;
  fetchUser: () => void;
};

const UserModal = ({ title, onClose, id, fetchUser }: PropTypes) => {
  const [users, setUsers] = useState<ModalUser[] | null>();
  const endpoint = title?.toLowerCase();

  const { error, fetchData } = useAxiosInstance(
    "/users/" + endpoint + "/" + id
  );

  const getUsers = async () => {
    const users: ModalUser[] = await fetchData();
    setUsers(users);
  };

  const promise = async () => {
    await Promise.all([getUsers(), fetchUser()]);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error) {
      onClose();
      toast.error("Something went wrong");
    }
  }, [error]);

  return (
    <Modal>
      <div className={styles.div}>
        <div className={styles.close}>
          <X onClick={onClose} />
        </div>
        <p className={styles.title}>{title}</p>

        <div className={styles.users}>
          {users ? (
            users.length ? (
              users.map((user) => (
                <User
                  key={user._id}
                  onClose={onClose}
                  onFetch={promise}
                  title={title}
                  user={user}
                />
              ))
            ) : (
              <div className={styles.progress}>
                <p>No data available</p>
              </div>
            )
          ) : (
            <div className={styles.progress}>
              <CircularProgress size={"1rem"} color="primary" />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default UserModal;
