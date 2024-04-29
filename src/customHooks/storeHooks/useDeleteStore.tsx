"use client";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { storeUrl } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";
const useDeleteStore = (id: number) => {
  const { token, setToken } = useAuth();
  setToken(window.localStorage.getItem("token"));
  const deleteStoreRequest = () => {
    return axios.delete(`${storeUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["deleteStore", id],
    mutationFn: deleteStoreRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllStore"] });
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

export default useDeleteStore;
