import { useEffect, useState, useCallback } from "react";

const useFetch = (url) => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true); 
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchUserData();
  }, [url, fetchUserData]);

  return { userData, error, isLoading, fetchUserData };
};

export default useFetch;
