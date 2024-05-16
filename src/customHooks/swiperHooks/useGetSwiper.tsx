"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { getSwiper } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";

const useGetSwiper = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getSwiperRequest = () => {
    return axios.get(getSwiper, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllSwiper"],
    queryFn: getSwiperRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetSwiper;
