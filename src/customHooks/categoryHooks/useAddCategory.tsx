"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { categoryType } from "src/types/categoryTypes";
import { categoryUrl } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";
import Cookies from "js-cookie";
const useAddCategory = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const addCategoryRequest = (categoryData: categoryType) => {

    return axios.post(categoryUrl, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: addCategoryRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllCategory"] });
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

export default useAddCategory;
