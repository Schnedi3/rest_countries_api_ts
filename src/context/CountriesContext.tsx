import { createContext, PropsWithChildren, useMemo, useState } from "react";

import { CountriesContextType } from "../types/types";
import { useFetchCountries } from "../hooks/useFetch";

export const CountriesContext = createContext<CountriesContextType | undefined>(
  undefined
);

const defaultRegion: string = "All";

export const CountriesProvider = ({ children }: PropsWithChildren) => {
  const { countries } = useFetchCountries();

  // search state
  const [searchInput, setSearchInput] = useState<string>("");

  // categories state
  const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegion);

  const uniqueRegions = [
    defaultRegion,
    ...new Set(countries.map((country) => country.region)),
  ];

  const filteredCountries = useMemo(() => {
    let filtered = countries;

    if (selectedRegion !== defaultRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    if (searchInput) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    return filtered;
  }, [selectedRegion, countries, searchInput]);

  return (
    <CountriesContext.Provider
      value={{
        searchInput,
        setSearchInput,
        filteredCountries,
        selectedRegion,
        setSelectedRegion,
        uniqueRegions,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
