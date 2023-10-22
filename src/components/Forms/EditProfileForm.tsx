import { X } from "react-feather";
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import Modal from "../../layout/Modal";
import styles from "./forms.module.scss";
import { useAppDispatch } from "../../hooks";
import { useAxiosAuth } from "../../hooks/useAxios";
import Loading from "../../layout/Backdrop";
import toast from "react-hot-toast";
import { setUser as _setUser } from "../../features/UserSlice";
import { axiosAuth } from "../../libs/axios";
import { UserProfile } from "../../helpers/types";

type PropTypes = {
  onClick: () => void;
  user: UserProfile;
  setUser: Dispatch<SetStateAction<UserProfile | null>>;
};

const EditProfileForm = ({ onClick, setUser, user }: PropTypes) => {
  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender,
    bio: user.bio,
  });
  const dispatch = useAppDispatch();

  const getUser = async () => {
    const { data } = await axiosAuth.get("/users");
    dispatch(_setUser(data));
    setUser(data);
  };

  const { isLoading, fetchData: editUser } = useAxiosAuth(
    "/users",
    "put",
    formData
  );

  const onEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to be logged in");
      return;
    }

    toast.promise(editUser(), {
      loading: "Updating your profile",
      success: () => {
        getUser();
        onClick();
        return "Your profile was updated";
      },
      error: "Failed to update your profile",
    });
  };

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
              <div className={styles.line}></div>
            </div>
            <div className={styles.field}>
              <input
                type="email"
                value={user.email}
                placeholder="Enter email"
                disabled
              />
              <div className={styles.line}></div>
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
              <div className={styles.line}></div>
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
              <div className={styles.line}></div>
            </div>
            <button>Edit Profile</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default EditProfileForm;
