"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { categoryUrl } from "src/app/_service/Service";
import { useAuth } from "src/app/context/AuthContext";

const useDeleteStore = (id: number | undefined) => {
  const { token, setToken } = useAuth();
  setToken(window.localStorage.getItem("token"));
  const deleteStoreRequest = () => {
    return axios.delete(`${categoryUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["deleteCategory", id],
    mutationFn: deleteStoreRequest,
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

export default useDeleteStore;
