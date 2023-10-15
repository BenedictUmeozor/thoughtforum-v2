import { Users } from "react-feather";
import { useState, useEffect } from "react";
import styles from "./top.module.scss";
import Member from "./Member";
import { useAxiosInstance } from "../../hooks/useAxios";
import { Skeleton } from "@mui/material";

export type MemberType = {
  _id: string;
  name: string;
  followers: string[];
  questions: string[];
};

const TopMembers = () => {
  const [members, setMembers] = useState<MemberType[] | null>(null);
  const { isLoading, error, fetchData } =
    useAxiosInstance("/users/top-members");

  const setData = async () => {
    setMembers(await fetchData());
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className={styles.div}>
      <div className={styles.title}>
        <Users />
        <h4>Top Members</h4>
      </div>
      <div>
        {error ? (
          <>
            <p>Something went wrong</p>
          </>
        ) : (
          <>
            {!members && isLoading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={150}
                  style={{ marginBottom: "1rem" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={150}
                  style={{ marginBottom: "1rem" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={150}
                  style={{ marginBottom: "1rem" }}
                />
              </>
            ) : (
              <>
                {members?.length ? (
                  members.map((member) => (
                    <Member
                      key={member._id}
                      onFollow={setData}
                      member={member}
                    />
                  ))
                ) : (
                  <>
                    <p>No members to show</p>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default TopMembers;
