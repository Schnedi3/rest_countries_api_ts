import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { ICountry } from "../types/types";

const baseURL = "https://restcountries.com/v3.1";

export const useFetchCountries = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${baseURL}/all`);
        setCountries(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export const useFetchCountry = () => {
  const { cca3 } = useParams<string>();
  const [country, setCountry] = useState<ICountry>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${baseURL}/alpha/${cca3}`);
        setCountry(response.data[0]);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (cca3) {
      fetchCountry();
    }
  }, [cca3]);

  return { country, loading, error };
};
