import { useState } from "react";
import { AxiosResponse, AxiosError } from "axios";
import { axiosAuth, axiosInstance } from "../libs/axios";

export const useAxiosInstance = <T,>(
  endpoint: string,
  method: "get" | "post" = "get",
  payload?: T
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    let response: AxiosResponse;

    try {
      setIsLoading(true);
      setError(null);

      if (method === "get") {
        response = await axiosInstance.get(endpoint);
        return response.data;
      }

      if (method === "post") {
        if (payload) {
          response = await axiosInstance.post(endpoint, payload);
        } else {
          response = await axiosInstance.post(endpoint);
        }
        return response.data;
      }
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as { error?: string };
        if (errorData.error) {
          console.log(errorData.error);
          setError(errorData.error);
        } else {
          setError("Something went wrong");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
};

export const useAxiosAuth = <T,>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete" = "get",
  payload?: T
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    let response: AxiosResponse;

    try {
      setIsLoading(true);
      setError(null);

      if (method === "get") {
        response = await axiosAuth.get(endpoint);
        return response.data;
      }

      if (method === "post") {
        if (payload) {
          response = await axiosAuth.post(endpoint, payload);
        } else {
          response = await axiosAuth.post(endpoint);
        }
        return response.data;
      }

      if (method === "put") {
        if (payload) {
          response = await axiosAuth.put(endpoint, payload);
        } else {
          response = await axiosAuth.put(endpoint);
        }
        return response.data;
      }

      if (method === "delete") {
        response = await axiosAuth.delete(endpoint);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as { error?: string };
        if (errorData.error) {
          console.log(errorData.error);
          setError(errorData.error);
        } else {
          setError("Something went wrong");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
};
