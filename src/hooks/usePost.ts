import { useState } from "react";
import{ AxiosRequestConfig, AxiosResponse } from "axios";
import { request } from "../api/request";

interface UsePostRequestResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  postData: (payload: any, config?: AxiosRequestConfig) => Promise<void>;
}
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
const usePostRequest = <T,>(url: string): UsePostRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (payload: any, config: AxiosRequestConfig = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await request.post(url, payload, config);
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePostRequest;
