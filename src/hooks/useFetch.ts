import { useState, useEffect } from "react";
import axios from "axios";
import { ICountry } from "../types/types";

const baseURL = "https://restcountries.com/v3.1";

export const useFetch = (endpoint: string) => {
  const [data, setData] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/${endpoint}`);
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
