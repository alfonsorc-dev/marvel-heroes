import { useRef } from "react";
import "./SearchBar.scss";
import searchIcon from "@/assets/magnifying-glass.svg";

export type SearchBarProps = {
  onChange: (value: string | null) => void;
};

const SearchBar = ({ onChange }: SearchBarProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const getFormValue = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    return formData.get("query");
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const query = getFormValue(event);
    onChange(query as string | null);
  };

  return (
    <div className="search-bar">
      <form ref={formRef} onChange={handleChange}>
        <button type="submit" className="search-bar__submit-button">
          <img src={searchIcon} alt="Search Icon" />
        </button>
        <input
          name="query"
          type="text"
          placeholder="SEARCH A CHARACTER..."
          className="search-bar__input"
          aria-label="Search input"
        ></input>
      </form>
    </div>
  );
};

export default SearchBar;
