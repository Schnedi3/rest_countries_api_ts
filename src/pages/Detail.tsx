import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCountriesContext } from "../context/useCountriesContext";
import { iconBack } from "../UIIcons";
import "../css/detail.css";

import { DetailSkeleton } from "../skeletons/Detailskeleton";

export const Detail = () => {
  const { countries, selectedCountry, setSelectedCountry } =
    useCountriesContext();

  // navigate to home
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  // border countries navigation
  const handleGoTo = (border: string) => {
    const foundCountry = countries.find((country) => country.cca3 === border);

    if (foundCountry) {
      setSelectedCountry(foundCountry);
      navigate(`/country/${border}`);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedCountry) {
      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
      setIsLoading(false);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      setSelectedCountry(JSON.parse(savedCountry));
    }
  }, [setSelectedCountry]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!selectedCountry) {
    return <DetailSkeleton />;
  }

  // destruture the country properties
  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = selectedCountry;

  return (
    <section className="countrydetail">
      <button onClick={handleReturn}>
        <img src={iconBack} alt="back to homepage" />
        Back
      </button>
      <article>
        <img src={flags.svg} alt={`${name.common} flag`} />

        <aside className="details">
          <h2>{name.common}</h2>

          <section>
            <article>
              <p>
                <span>Native name:</span>{" "}
                {Object.values(name.nativeName)
                  .map((native) => native.common)
                  .join(", ")}
              </p>
              <p>
                <span>Population:</span> {population.toLocaleString()}
              </p>
              <p>
                <span>Region:</span> {region}
              </p>
              <p>
                <span>Sub Region:</span> {subregion}
              </p>
              <p>
                <span>Capital:</span> {capital.join(", ")}
              </p>
            </article>
            <article>
              <p>
                <span>Top Level Domain:</span> {tld}
              </p>
              <p>
                <span>Currencies:</span>{" "}
                {Object.values(currencies)
                  .map((currency) => currency.name)
                  .join(", ")}
              </p>
              <p>
                <span>Languages:</span> {Object.values(languages).join(", ")}
              </p>
            </article>
          </section>

          {borders && (
            <div>
              <p>Border Countries:</p>
              <ul>
                {borders.map((border, index) => (
                  <li
                    className="border"
                    key={index}
                    onClick={() => handleGoTo(border)}
                  >
                    {border}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </article>
    </section>
  );
};
