import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CountriesContextType, ICountry } from "../types/types";

export const CountriesContext = createContext<CountriesContextType | undefined>(
  undefined
);

const defaultRegion: string = "All";

export const CountriesProvider = ({ children }: PropsWithChildren) => {
  const [countries, setCountries] = useState<ICountry[]>([]);

  // country state
  const [selectedCountry, setSelectedCountry] = useState<
    ICountry | undefined
  >();

  // search state
  const [searchInput, setSearchInput] = useState<string>("");

  // modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  // categories state
  const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegion);

  const uniqueRegions = [
    defaultRegion,
    ...new Set(countries.map((country) => country.region)),
  ];

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    closeModal();
  };

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

  useEffect(() => {
    window.addEventListener("resize", closeModal);

    return () => {
      window.removeEventListener("resize", closeModal);
    };
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        setCountries,
        selectedCountry,
        setSelectedCountry,
        searchInput,
        setSearchInput,
        isModalOpen,
        toggleModal,
        filteredCountries,
        selectedRegion,
        uniqueRegions,
        handleRegionChange,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
