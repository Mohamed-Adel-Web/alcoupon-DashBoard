"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { loginData } from "../types/loginTypes";
import { loginUrl } from "src/app/_service/Service";
import toast from "react-hot-toast";
import { useAuth } from "src/app/context/AuthContext";
const useAdminSignIn = () => {
  const { token, setToken } = useAuth();
  const signInRequest = (adminData: loginData) => {
    return axios.post(loginUrl, adminData);
  };

  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["SignIn"],
    mutationFn: signInRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        window.localStorage.setItem("token", data.data.data.token);
        setToken(data.data.data.token);
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
