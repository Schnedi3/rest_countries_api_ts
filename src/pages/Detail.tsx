import { Link, useNavigate } from "react-router-dom";

import { useFetchCountry } from "../hooks/useFetch";
import { DetailSkeleton } from "../skeletons/Detailskeleton";
import { iconBack } from "../UIIcons";

import "../css/detail.css";

export const Detail = () => {
  const { fetchedCountry, loading, error } = useFetchCountry();
  const navigate = useNavigate();

  if (loading) return <DetailSkeleton />;
  if (error) return <p>{error}</p>;
  if (!fetchedCountry) return <DetailSkeleton />;

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
  } = fetchedCountry;

  return (
    <section className="country_detail">
      <button onClick={() => navigate(-1)}>
        <img src={iconBack} alt="back to homepage" />
        Back
      </button>
      <article>
        <img src={flags.svg} alt={`${name.common} flag`} />

        <aside className="details">
          <h2>{name.common}</h2>

          <section>
            <article>
              {name.nativeName && (
                <p>
                  <span>Native name:</span>{" "}
                  {Object.values(name.nativeName)
                    .map((native) => native.common)
                    .join(", ")}
                </p>
              )}
              <p>
                <span>Population:</span> {population.toLocaleString()}
              </p>
              <p>
                <span>Region:</span> {region}
              </p>
              {subregion && (
                <p>
                  <span>Sub Region:</span> {subregion}
                </p>
              )}
              {capital && (
                <p>
                  <span>Capital:</span> {capital.join(", ")}
                </p>
              )}
            </article>
            <article>
              {tld && (
                <p>
                  <span>Top Level Domain:</span> {tld}
                </p>
              )}
              {currencies && (
                <p>
                  <span>Currencies:</span>{" "}
                  {Object.values(currencies)
                    .map((currency) => currency.name)
                    .join(", ")}
                </p>
              )}
              {languages && (
                <p>
                  <span>Languages:</span> {Object.values(languages).join(", ")}
                </p>
              )}
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
