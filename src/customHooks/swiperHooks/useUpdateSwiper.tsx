"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "src/app/context/AuthContext";
const useUpdateSwiper = (id: number | undefined) => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const updateSwiperRequest = (swiperImage: FormData) => {
    return axios.post(`${updateSwiperUrl}/${id}`, swiperImage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["updateSwiper", id],
    mutationFn: updateSwiperRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllSwiper"] });
      } else {
        toast.error(`${data.data.message}`);
      }
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useUpdateSwiper;
