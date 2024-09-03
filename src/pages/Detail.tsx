import { useNavigate } from "react-router-dom";

import { useCountriesContext } from "../context/useCountriesContext";
import { iconBack } from "../UIIcons";
import "../css/detail.css";

export const Detail = () => {
  const { selectedCountry } = useCountriesContext();
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  if (!selectedCountry) {
    return (
      <section className="countrydetail">
        <button onClick={handleReturn}>
          <img src={iconBack} alt="back to homepage" />
          Back
        </button>
        <p>No country selected. Please go back and select a country</p>
      </section>
    );
  }

  return (
    <section className="countrydetail">
      <button onClick={handleReturn}>
        <img src={iconBack} alt="back to homepage" />
        Back
      </button>
      <article>
        <img
          src={selectedCountry.flags.svg}
          alt={`${selectedCountry.name.common} flag`}
        />

        <aside className="details">
          <h2>{selectedCountry.name.common}</h2>

          <section>
            <article>
              <p>
                <span>Native name:</span>{" "}
                {Object.values(selectedCountry.name.nativeName)
                  .map((native) => native.common)
                  .join(", ")}
              </p>
              <p>
                <span>Population:</span> {population.toLocaleString()}
              </p>
              <p>
                <span>Region:</span> {selectedCountry.region}
              </p>
              <p>
                <span>Sub Region:</span> {selectedCountry.subregion}
              </p>
              <p>
                <span>Capital:</span> {selectedCountry.capital.join(", ")}
              </p>
            </article>
            <article>
              <p>
                <span>Top Level Domain:</span> {selectedCountry.tld}
              </p>
              <p>
                <span>Currencies:</span>{" "}
                {Object.values(selectedCountry.currencies)
                  .map((currency) => currency.name)
                  .join(", ")}
              </p>
              <p>
                <span>Languages:</span>{" "}
                {Object.values(selectedCountry.languages).join(", ")}
              </p>
            </article>
          </section>

          {selectedCountry.borders && (
            <div>
              <p>Border Countries:</p>
              <ul>
                {selectedCountry.borders.map((border, index) => (
                  <li key={index}>{border}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </article>
    </section>
  );
};
