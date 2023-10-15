import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChildrenWithClassName } from "../helpers/types";
import { useAppSelector } from "../hooks";

const UnprotectedLayout = ({ children, className }: ChildrenWithClassName) => {
  const { refreshToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshToken) {
      navigate("/");
    }
  }, [refreshToken, navigate]);

  return <div className={className}>{children}</div>;
};
export default UnprotectedLayout;
