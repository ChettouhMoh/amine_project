import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../services/api";

export function useTransactions() {
  return useQuery({
    queryKey: ["wallet-transactions"],
    queryFn: fetchTransactions,
    staleTime: 60_000,
  });
}
