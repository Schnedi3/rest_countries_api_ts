import { useParams } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { BorderCountries } from "./BorderCountries";
import { DetailSkeleton } from "../skeletons/Detailskeleton";

import "../css/info.css";

export const CountryInfo = () => {
  const { cca3 } = useParams<string>();
  const { data: country, loading, error } = useFetch(`alpha/${cca3}`);

  const singleCountry = country[0];

  if (loading) return <DetailSkeleton />;
  if (error) return <p>{error}</p>;

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
  } = singleCountry;

  return (
    <article className="info">
      <img src={flags.svg} alt={`${name.common} flag`} />

      <aside>
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
                <span>Top Level Domain:</span> {tld.join(", ")}
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
        <section>
          <BorderCountries borders={borders} />
        </section>
      </aside>
    </article>
  );
};
