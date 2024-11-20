import { isCancel, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { request } from "../api/request";

type UseFetchParams = {
  [key: string]: any;
};

type UseFetchResult<T> = {
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  isLoading: boolean;
  error: string;
  response: AxiosResponse<T> | null;
  refetch: () => void;
  retries: number;
};

function useFetch<T = any>(
  url: string | null,
  deps: any[] = [],
  params: UseFetchParams = {}
): UseFetchResult<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    if (!url) {
      // Skip fetching if no URL is provided
      setIsLoading(false);
      return;
    }

    // abort controller to cancel the request if another request is in progress
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await request.get<T>(url, {
          params,
          signal: controller.signal,
        });
        setData(res.data);
        setResponse(res);
      } catch (err: any) {
        if (isCancel(err)) return;
        setError(err?.message || "Something went wrong");
        setResponse(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // abort the request
      controller.abort();
    };
  }, [url, retries, ...deps]);

  function refetch() {
    setRetries((prev) => prev + 1);
  }

  return { data, setData, isLoading, error, response, refetch, retries };
}

export default useFetch;
