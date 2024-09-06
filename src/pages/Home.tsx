import { useState } from "react";

import { useFetch } from "../hooks/useFetch";
import { Search } from "../components/Search";
import { Region } from "../components/Region";
import { CountryCard } from "../components/CountryCard";

import "../css/home.css";

export const defaultRegion: string = "All";

export const Home = () => {
  const { data: countries, loading, error } = useFetch("all");

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegion);

  return (
    <section className="home">
      <section>
        <Search inputValue={inputValue} setInputValue={setInputValue} />
        <Region
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          countries={countries}
        />
      </section>

      <ul>
        <CountryCard
          inputValue={inputValue}
          selectedRegion={selectedRegion}
          countries={countries}
          loading={loading}
          error={error}
        />
      </ul>
    </section>
  );
};
