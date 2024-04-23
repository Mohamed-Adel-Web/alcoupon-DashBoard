"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { categoryType } from "src/types/categoryTypes";
const useAddCategory = () => {
  const addCategoryRequest = (storeData: categoryType) => {
    return axios.post(
      "https://f155-41-234-214-241.ngrok-free.app/api/admin/login",
      storeData,
      { headers: { token: "" } }
    );
  };

  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: addCategoryRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
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
