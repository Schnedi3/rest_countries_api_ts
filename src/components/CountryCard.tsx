import { useMemo } from "react";
import { Link } from "react-router-dom";

import { ICountryCardProps } from "../types/types";
import { defaultRegion } from "../pages/Home";

import { HomeSkeleton } from "../skeletons/HomeSkeleton";
import "../css/countrycard.css";

export const CountryCard = ({
  inputValue,
  selectedRegion,
  countries,
  loading,
  error,
}: ICountryCardProps) => {
  const filteredCountries = useMemo(() => {
    let filtered = countries;

    if (selectedRegion !== defaultRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    if (inputValue) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    return filtered;
  }, [selectedRegion, countries, inputValue]);

  if (loading) return <HomeSkeleton />;
  if (error) return <p>{error}</p>;

  return (
    <section className="country_list">
      <ul>
        {filteredCountries.map((country) => (
          <li className="country" key={country.cca3}>
            <Link to={`/country/${country.cca3}`}>
              <figure>
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  loading="lazy"
                />
              </figure>
              <div className="country_info">
                <h3>{country.name.common}</h3>
                <p>
                  <span>Population:</span> {country.population.toLocaleString()}
                </p>
                <p>
                  <span>Region:</span> {country.region}
                </p>
                {country.capital && (
                  <p>
                    <span>Capital:</span> {country.capital}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
