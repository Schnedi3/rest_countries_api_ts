import { Link } from "react-router-dom";

import { useCountriesContext } from "../context/useCountriesContext";
import { useFetchCountries } from "../hooks/useFetch";
import { Search } from "../components/Search";
import { HomeSkeleton } from "../skeletons/HomeSkeleton";

import "../css/home.css";

export const Home = () => {
  const { loading, error } = useFetchCountries();
  const { filteredCountries } = useCountriesContext();

  if (loading) return <HomeSkeleton />;
  if (error) return <p>{error}</p>;

  return (
    <section className="countrylist">
      <Search />

      <ul>
        {filteredCountries.map((country, index) => (
          <Link to={`/country/${country.cca3}`} key={index}>
            <li className="country">
              <figure>
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
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
          </Link>
        ))}
      </ul>
    </section>
  );
};
