import { useState } from "react";
import {
  sendMoneyApi,
  type SendMoneyPayload,
  type SendMoneyResponse,
} from "../services/api";

export function useSendMoney() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SendMoneyResponse | null>(null);

  const sendMoney = async (
    data: SendMoneyPayload,
  ): Promise<SendMoneyResponse | undefined> => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await sendMoneyApi(data);
      setResponse(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMoney, isLoading, error, response };
}
