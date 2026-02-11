import { formatDistanceToNow } from "date-fns";
import type { Transaction } from "../services/api";

interface Props {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 w-[400px] max-w-full">
      <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>

      <div className="divide-y divide-gray-100">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex justify-between items-center py-4">
            <div>
              <p className="text-sm font-medium text-gray-800 capitalize">
                {tx.type}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatDistanceToNow(new Date(tx.date))} ago
              </p>
            </div>

            <p
              className={`text-lg font-semibold ${
                tx.type === "credit" ? "text-green-600" : "text-red-600"
              }`}
            >
              {tx.type === "credit" ? "+" : "-"}
              {tx.amount.toLocaleString()} DZD
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
