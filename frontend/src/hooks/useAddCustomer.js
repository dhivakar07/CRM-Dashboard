import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_API;

export function useAddCustomer() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (newCustomer) => axios.post(API_URL, newCustomer),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["customers"] });
      console.log("Customer Added Successfully");
    },
    onError: (error) => {
      console.error("Failed to Add customer:", error.message);
    },
  });
}
