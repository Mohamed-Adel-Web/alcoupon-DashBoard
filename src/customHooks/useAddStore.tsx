"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const useAddStore = () => {
  const addStoreRequest = (storeData: FormData) => {
    return axios.post(
      "https://f155-41-234-214-241.ngrok-free.app/api/admin/login",
      storeData,
      { headers: { token: "" } }
    );
  };

  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addStore"],
    mutationFn: addStoreRequest,
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

export default useAddStore;
