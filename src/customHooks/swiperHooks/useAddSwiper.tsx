"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { swiperUrl } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";
interface AxiosError {
  response?: {
    data: {
      message: string;
    };
  };
}
const useAddSwiper = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const addSwiperRequest = (swiperImage: FormData) => {
    return axios.post(swiperUrl, swiperImage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addSwiper"],
    mutationFn: addSwiperRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllSwiper"] });
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

export default useAddSwiper;
