// hooks/useUpdateCustomer.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_API;

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updates }) =>
      axios.patch(`${API_URL}/${id}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      console.log("Edited Successfully");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
