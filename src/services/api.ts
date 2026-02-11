import axios from "axios";

export const api = axios.create({
  baseURL: "https://mock.apibase.dev",
});

// ---- TYPES ----

export interface WalletResponse {
  balance: number;
  currency: string;
  lastUpdated: string;
}

export interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  date: string;
}

// ---- MOCK DATA ----

const mockWallet: WalletResponse = {
  balance: 12500,
  currency: "DZD",
  lastUpdated: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
};

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "credit",
    amount: 5000,
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    type: "debit",
    amount: 2000,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    type: "credit",
    amount: 1500,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    type: "credit",
    amount: 850,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    type: "debit",
    amount: 2300,
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ---- MOCKED CALLS ----

export async function fetchWallet(): Promise<WalletResponse> {
  return new Promise((resolve) => setTimeout(() => resolve(mockWallet), 600));
}

export async function fetchTransactions(): Promise<Transaction[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockTransactions.slice(0, 5)), 600),
  );
}

// Sending Money API (mocked)
export interface SendMoneyPayload {
  walletId: string;
  amount: number;
}

export interface SendMoneyResponse {
  success: boolean;
  message: string;
}
export async function sendMoneyApi(
  data: SendMoneyPayload,
): Promise<SendMoneyResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.walletId === "0000-0000-0000-0000") {
        reject({ success: false, message: "Invalid wallet ID" });
      } else {
        // Add transaction
        const newTransaction: Transaction = {
          id: mockTransactions.length + 1,
          type: "debit", // sending money = debit
          amount: data.amount,
          date: new Date().toISOString(),
        };
        mockTransactions.unshift(newTransaction); // newest on top

        // Update wallet balance
        mockWallet.balance -= data.amount;
        mockWallet.lastUpdated = new Date().toISOString();

        resolve({
          success: true,
          message: `Sent ${data.amount} DZD to ${data.walletId}`,
        });
      }
    }, 1500); // simulate network delay
  });
}
