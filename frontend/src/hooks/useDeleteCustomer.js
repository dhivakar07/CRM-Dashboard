import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_API;

export function useDeleteCustomer() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}/${id}`),
    onMutate: async (id) => {
      await queryclient.cancelQueries({ queryKey: ["customers"] });
      const previous = queryclient.getQueryData(["customers"]);
      queryclient.setQueryData(["customers"], (old) =>
        old.filter((c) => c.id !== id),
      );
      return { previous };
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["customers"] });
      console.log("Customer deleted");
    },
    onError: (error) => {
      console.error("Failed to delete customer:", error.message);
    },
  });
}
