"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { categoryType } from "src/types/categoryTypes";
import { useAuth } from "src/app/context/AuthContext";
import { couponUrl } from "src/app/_service/Service";
import { couponType } from "src/types/couponTypes";
import Cookies from "js-cookie";
interface AxiosError {
  response?: {
    data: {
      message: string;
    };
  };
}
const useUpdatedCoupon = (id: number | undefined) => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const updateCouponRequest = (couponData: couponType) => {
    return axios.put(`${couponUrl}/${id}`, couponData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["updateCoupon", id],
    mutationFn: updateCouponRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllCoupons"] });
      } else {
        toast.error(`${data.data.message}`);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(`${error?.response?.data.message}`);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useUpdatedCoupon;
