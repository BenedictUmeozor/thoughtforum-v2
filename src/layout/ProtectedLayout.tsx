import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChildrenWithClassName } from "../helpers/types";
import { useAppSelector } from "../hooks";

const ProtectedLayout = ({ children, className }: ChildrenWithClassName) => {
  const { refreshToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!refreshToken) {
      navigate("/login");
    }
  }, [refreshToken, navigate]);

  return <div className={className}>{children}</div>;
};
export default ProtectedLayout;
