"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { storeUrl } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";

const useGetStore = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getStoreRequest = () => {
    return axios.get(storeUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllStore"],
    queryFn: getStoreRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetStore;
