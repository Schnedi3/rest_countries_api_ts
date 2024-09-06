import { useEffect, useState } from "react";

import { IRegionProps } from "../types/types";
import { defaultRegion } from "../pages/Home";

import { iconBack } from "../UIIcons";
import "../css/region.css";

export const Region = ({
  selectedRegion,
  setSelectedRegion,
  countries,
}: IRegionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const uniqueRegions = [
    defaultRegion,
    ...new Set(countries.map((country) => country.region)),
  ];

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
    <article className="region">
      <button onClick={toggleModal}>
        {selectedRegion === defaultRegion ? "Filter by region" : selectedRegion}{" "}
        <img src={iconBack} />
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
  );
};
