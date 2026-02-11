import { useQuery } from "@tanstack/react-query";
import { fetchWallet } from "../services/api";

export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: fetchWallet,
    staleTime: 60_000,
  });
}
