import { useState } from "react";
import { useSendMoney } from "../hooks/useSendMoney";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refetchWallet: () => void;
  refetchTransactions: () => void;
}

export function SendMoneyModal({
  isOpen,
  onClose,
  refetchWallet,
  refetchTransactions,
}: Props) {
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");

  const { sendMoney, isLoading, error } = useSendMoney();

  if (!isOpen) return null;

  // Wallet ID regex: XXXX-XXXX-XXXX-XXXX
  const walletIdRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
  const isWalletIdValid = walletIdRegex.test(walletId);

  const isAmountValid =
    amount !== "" && !isNaN(Number(amount)) && Number(amount) > 0;

  const isValid = isWalletIdValid && isAmountValid;

  const handleSend = async () => {
    try {
      const res = await sendMoney({ walletId, amount: Number(amount) });

      if (res?.success) {
        // Refetch dashboard data
        refetchWallet();
        refetchTransactions();

        // Clear form
        setWalletId("");
        setAmount("");
        onClose();
      }
    } catch (err) {
      // error handled in hook - no need to handle again
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-semibold mb-6">Send Money</h3>

        <div className="space-y-4">
          {/* Wallet ID */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Wallet ID
            </label>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 ${
                isWalletIdValid
                  ? "border-gray-200 focus:ring-blue-500"
                  : "border-red-400 focus:ring-red-500"
              }`}
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
            />
            {!isWalletIdValid && walletId.length > 0 && (
              <p className="text-sm text-red-500 mt-1">
                Wallet ID must be in format XXXX-XXXX-XXXX-XXXX
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 ${
                isAmountValid
                  ? "border-gray-200 focus:ring-blue-500"
                  : "border-red-400 focus:ring-red-500"
              }`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {!isAmountValid && amount.length > 0 && (
              <p className="text-sm text-red-500 mt-1">
                Amount must be greater than 0
              </p>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            className="px-4 py-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            disabled={!isValid || isLoading}
            onClick={handleSend}
            className={`px-6 py-2 rounded-xl text-white transition ${
              isValid && !isLoading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
