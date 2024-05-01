"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { categoryUrl } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";

const useGetCategory = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getCategoryRequest = () => {
    return axios.get(categoryUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllCategory"],
    queryFn: getCategoryRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetCategory;
