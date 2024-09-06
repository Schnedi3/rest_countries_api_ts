import { ISearchProps } from "../types/types";
import { iconClear, iconSearch } from "../UIIcons";
import "../css/search.css";

export const Search = ({ inputValue, setInputValue }: ISearchProps) => {
  return (
    <article className="search">
      <img className="find_icon" src={iconSearch} alt="search icon" />
      <input
        className="search_input"
        type="text"
        placeholder="Search for a country..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <img
        className={`clear_icon${inputValue ? " clear_icon-show" : ""}`}
        src={iconClear}
        alt="clear field"
        onClick={() => setInputValue("")}
      />
    </article>
  );
};
