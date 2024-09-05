import { Link } from "react-router-dom";

import { useFetchCountry } from "../hooks/useFetch";
import { DetailSkeleton } from "../skeletons/Detailskeleton";
import { iconBack } from "../UIIcons";

import "../css/detail.css";

export const Detail = () => {
  const { country, loading, error } = useFetchCountry();

  if (loading) return <DetailSkeleton />;
  if (error) return <p>{error}</p>;
  if (!country) return <DetailSkeleton />;

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
  } = country;

  return (
    <section className="country_detail">
      <Link to={"/"}>
        <button>
          <img src={iconBack} alt="back to homepage" />
          Back
        </button>
      </Link>
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
                  <Link
                    to={`/country/${border}`}
                    key={index}
                    className="border"
                  >
                    <li>{border}</li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </article>
    </section>
  );
};
