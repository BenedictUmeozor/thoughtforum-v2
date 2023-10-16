import { X } from "react-feather";
import { useState, useEffect, FormEvent } from "react";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useAxiosAuth } from "../../hooks/useAxios";
import Loading from "../../layout/Backdrop";
import toast from "react-hot-toast";
import { setUser } from "../../features/UserSlice";
import { axiosAuth } from "../../libs/axios";

type PropTypes = {
  onClick: () => void;
};

const EditProfileForm = ({ onClick }: PropTypes) => {
  const user = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender,
    bio: user.bio,
  });
  const dispatch = useAppDispatch();

  const getUser = async () => {
    const { data } = await axiosAuth.get("/users");
    dispatch(setUser(data));
  };

  const {
    isLoading,
    fetchData: editQuestion,
    error,
  } = useAxiosAuth("/users", "put", formData);

  const onEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to be logged in");
      return;
    }

    const promise = await editQuestion();
    if (promise) {
      getUser().then(() => {
        onClick();
        toast.success("Profile updated successfully");
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  return (
    <>
      {isLoading && <Loading condition={true} />}
      <Modal>
        <form className={styles.form} onSubmit={onEdit}>
          <div className={styles.close}>
            <X onClick={onClick} />
          </div>
          <p className={styles.title}>Edit profie</p>

          <div className={styles.fields}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <input
                type="email"
                value={user.email}
                placeholder="Enter email"
                disabled
              />
            </div>
            <div className={styles.field}>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.field}>
              <textarea
                rows={8}
                placeholder="Enter bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              ></textarea>
            </div>
            <button>Edit Profile</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default EditProfileForm;
