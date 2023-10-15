import { useAxiosInstance } from "./useAxios";
import { useState } from "react";

export const useAuthRefresh = () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken")!);
  const [error, setError] = useState(false);
  const { fetchData } = useAxiosInstance("/auth/refresh", "post", {
    token: refreshToken,
  });

  const getData = async () => {
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      setError(true);
    }
  };

  return { getData, error };
};
