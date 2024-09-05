import { useEffect, useState } from "react";

import { useCountriesContext } from "../context/useCountriesContext";
import { iconBack, iconClear, iconSearch } from "../UIIcons";
import "../css/search.css";

export const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const {
    searchInput,
    setSearchInput,
    selectedRegion,
    uniqueRegions,
    setSelectedRegion,
  } = useCountriesContext();

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    closeModal();
  };

  useEffect(() => {
    window.addEventListener("resize", closeModal);

    return () => {
      window.removeEventListener("resize", closeModal);
    };
  }, []);

  return (
    <section className="search_filter">
      <article className="search">
        <img className="find_icon" src={iconSearch} alt="search icon" />
        <input
          className="search_input"
          type="text"
          placeholder="Search for a country..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          className={`clear_icon${!searchInput ? " clear_icon-hidden" : ""}`}
          src={iconClear}
          alt="clear field"
          onClick={() => setSearchInput("")}
        />
      </article>
      <article className="dropdown">
        <button onClick={toggleModal}>
          {selectedRegion} <img src={iconBack} />
        </button>
        <ul className={isModalOpen ? "modal_open" : ""}>
          {uniqueRegions.map((region) => (
            <li
              key={region}
              onClick={() => handleRegionChange(region)}
              className={region === selectedRegion ? "active" : ""}
            >
              {region}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};
