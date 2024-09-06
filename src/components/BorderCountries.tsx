import { Link } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { IBordersProps } from "../types/types";

import "../css/borders.css";

export const BorderCountries = ({ borders }: IBordersProps) => {
  const {
    data: fetchedBorders,
    loading: bordersLoading,
    error: bordersError,
  } = useFetch(`alpha?codes=${borders.join(",")}`);

  return (
    borders.length > 0 && (
      <section className="borders_container">
        <p>Border Countries:</p>
        {bordersLoading ? (
          <p>Loading border countries...</p>
        ) : bordersError ? (
          <p>{bordersError}</p>
        ) : (
          <ul className="borders">
            {fetchedBorders.map((borderCountry) => (
              <Link
                to={`/country/${borderCountry.cca3}`}
                key={borderCountry.cca3}
              >
                <li>{borderCountry.name.common}</li>
              </Link>
            ))}
          </ul>
        )}
      </section>
    )
  );
};
