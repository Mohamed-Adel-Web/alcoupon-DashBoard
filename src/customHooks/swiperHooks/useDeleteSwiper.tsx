"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { deleteSwiperUrl } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";
const useDeleteSwiper = (id: number | undefined) => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const deleteSwiperRequest = () => {
    return axios.delete(`${deleteSwiperUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["deleteSwiper", id],
    mutationFn: deleteSwiperRequest,
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

export default useDeleteSwiper;
