import { BackButton } from "../components/BackButton";
import { CountryInfo } from "../components/CountryInfo";

import "../css/detail.css";

export const Country = () => {
  return (
    <section className="detail">
      <BackButton />
      <CountryInfo />
    </section>
  );
};
