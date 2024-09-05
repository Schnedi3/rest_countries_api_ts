import { Link, useNavigate } from "react-router-dom";

import { useFetchCountry, useFetchBorders } from "../hooks/useFetch";
import { DetailSkeleton } from "../skeletons/Detailskeleton";
import { iconBack } from "../UIIcons";

import "../css/detail.css";

export const Detail = () => {
  const { fetchedCountry, loading, error } = useFetchCountry();
  const navigate = useNavigate();

  const bordersArray = fetchedCountry?.borders || [];
  const {
    fetchedBorders,
    loading: bordersLoading,
    error: bordersError,
  } = useFetchBorders(bordersArray);

  if (loading) return <DetailSkeleton />;
  if (error) return <p>{error}</p>;
  if (!fetchedCountry) return <DetailSkeleton />;

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

          {borders && borders.length > 0 && (
            <div>
              <p>Border Countries:</p>
              {bordersLoading ? (
                <p>Loading border countries...</p>
              ) : bordersError ? (
                <p>{bordersError}</p>
              ) : (
                <ul>
                  {fetchedBorders.map((borderCountry, index) => (
                    <Link
                      to={`/country/${borderCountry.cca3}`}
                      key={index}
                      className="border"
                    >
                      <li>{borderCountry.name.common}</li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          )}
        </aside>
      </article>
    </section>
  );
};
