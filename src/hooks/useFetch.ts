import { useState, useEffect } from "react";
import axios from "axios";

import { useCountriesContext } from "../context/useCountriesContext";

const baseURL = "https://restcountries.com/v3.1/all";

export const useFetchCountries = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setCountries } = useCountriesContext();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(baseURL);
        setCountries(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [setCountries]);

  return { loading, error };
};
