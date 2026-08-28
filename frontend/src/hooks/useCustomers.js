import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_API;

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
