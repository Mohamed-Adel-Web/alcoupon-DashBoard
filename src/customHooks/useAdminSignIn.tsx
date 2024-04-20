"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { submittedData } from "../types/loginTypes";
import toast from "react-hot-toast";
const useAdminSignIn = () => {
  const signInRequest = (adminData: submittedData) => {
    return axios.post(
      "https://f155-41-234-214-241.ngrok-free.app/api/admin/login",
      adminData
    );
  };

  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["SignIn"],
    mutationFn: signInRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        window.localStorage.setItem("token", data.data.data.token);
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

export default useAdminSignIn;
