import { LogOut, X } from "react-feather";
import Modal from "../../layout/Modal";
import styles from "./logout.module.scss";
import { useAxiosAuth } from "../../hooks/useAxios";
import { useAppDispatch, useAppSelector, useSocket } from "../../hooks";
import Loading from "../../layout/Backdrop";
import { deleteCredentials } from "../../features/AuthSlice";
import toast from "react-hot-toast";

const Logout = ({ onClose }: { onClose: () => void }) => {
  const { refreshToken: token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const { fetchData, isLoading } = useAxiosAuth("/auth/logout", "post", {
    token,
  });

  const handleLogout = async () => {
    const data = await fetchData();
    if (data) {
      dispatch(deleteCredentials());
      socket?.emit("logout");
      toast.success("You are now logged out")
      onClose();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isLoading && <Loading condition={true} />}
      <Modal>
        <div className={styles.modal}>
          <div className={styles.close}>
            <X onClick={onClose} />
          </div>
          <div className={styles.svg}>
            <LogOut />
          </div>
          <div className={styles.text}>
            <h2>Oh no! You are leaving</h2>
            <h3>Are you sure?</h3>
          </div>
          <div className={styles.buttons}>
            <button onClick={onClose}>Nah, just kidding</button>
            <button onClick={handleLogout}>Yes, Log me out</button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Logout;
