import { useNavigate } from "react-router-dom";

import { useCountriesContext } from "../context/useCountriesContext";
import { useFetchCountries } from "../hooks/useFetch";
import { ICountry } from "../types/types";
import { Search } from "../components/Search";
import { HomeSkeleton } from "../skeletons/HomeSkeleton";
import "../css/home.css";

export const Home = () => {
  const { loading, error } = useFetchCountries();
  const { setSelectedCountry, filteredCountries } = useCountriesContext();

  // navigate to country page
  const navigate = useNavigate();
  const handleClick = (country: ICountry) => {
    setSelectedCountry(country);
    navigate(`/country/${country.cca3}`);
  };

  if (loading) return <HomeSkeleton />;
  if (error) return <p>{error}</p>;

  return (
    <section className="countrylist">
      <Search />

      <ul>
        {filteredCountries.map((country, index) => (
          <li className="country" key={index}>
            <figure>
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                onClick={() => handleClick(country)}
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
          </li>
        ))}
      </ul>
    </section>
  );
};
