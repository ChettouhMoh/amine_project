import { formatDistanceToNow } from "date-fns";
import type { WalletResponse } from "../services/api";

interface Props {
  wallet: WalletResponse;
}

export function WalletCard({ wallet }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 w-[250px] max-w-sm">
      <h2 className="text-lg font-semibold text-gray-500">Wallet Balance</h2>

      <p className="text-3xl font-bold mt-2 text-gray-900">
        {wallet.balance.toLocaleString()} {wallet.currency}
      </p>

      <p className="text-sm text-gray-400 mt-2">
        Updated {formatDistanceToNow(new Date(wallet.lastUpdated))} ago
      </p>
    </div>
  );
}
