"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { couponUrl } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";

const useGetCoupon = () => {
  const { token, setToken } = useAuth();
  setToken(window.localStorage.getItem("token"));
  const getCouponRequest = () => {
    return axios.get( couponUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllCoupons"],
    queryFn: getCouponRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetCoupon;
