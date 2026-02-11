import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionsList } from "../components/TransactionsList";
import { WalletCard } from "../components/WalletCardComponent";
import { SendMoneyModal } from "../components/SendMoneyModel";

export function DashboardWallet() {
  const {
    data: wallet,
    isLoading,
    error,
    refetch: refetchWallet,
  } = useWallet();
  const { data: transactions, refetch: refetchTransactions } =
    useTransactions();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading data</p>;

  return (
    <div className="flex-1 min-h-0 overflow-auto bg-gray-50 p-6 space-y-6 ">
      {/* Wallet Card */}
      <div className="w-full">{wallet && <WalletCard wallet={wallet} />}</div>

      {/* Transactions */}
      <div className="w-full">
        {transactions && <TransactionsList transactions={transactions} />}
      </div>

      {/* Send Money Button */}
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
        >
          Send Money
        </button>
      </div>

      {/* Modal */}
      <SendMoneyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetchWallet={refetchWallet}
        refetchTransactions={refetchTransactions}
      />
    </div>
  );
}
