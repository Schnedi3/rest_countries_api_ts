import { useNavigate } from "react-router-dom";

import { iconBack } from "../UIIcons";
import "../css/backbutton.css";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <article className="back">
      <button onClick={() => navigate(-1)}>
        <img src={iconBack} alt="back to homepage" />
        Back
      </button>
    </article>
  );
};
