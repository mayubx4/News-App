import { useState, useEffect } from "react";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface ApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface ApiError {
  status: string;
  code: string;
  message: string;
}

type FetchResult = ApiResponse | null;
type FetchError = ApiError | null;

function useFetch(url: string): [FetchResult, boolean, FetchError] {
  const [data, setData] = useState<FetchResult>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorData: ApiError = await response.json();
          throw new Error(`API Error: ${errorData.message}`);
        }

        const result: ApiResponse = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
}
export default useFetch