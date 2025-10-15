import { useRef } from "react";
import "./SearchBar.scss";
import searchIcon from "@/assets/magnifying-glass.svg";

export type SearchBarProps = {
  onSubmit: (value: string | null) => void;
  onChange: (value: string | null) => void;
};

const SearchBar = ({ onSubmit, onChange }: SearchBarProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const getFormValue = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    return formData.get("query");
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = getFormValue(event);
    onSubmit(query as string | null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const query = getFormValue(event);
    onChange(query as string | null);
  };

  return (
    <div className="search-bar">
      <form ref={formRef} onChange={handleChange} onSubmit={handleSubmit}>
        <button type="submit" className="search-bar__submit-button">
          <img src={searchIcon} alt="Search Icon" />
        </button>
        <input
          name="query"
          type="text"
          placeholder="SEARCH A CHARACTER..."
          className="search-bar__input"
        ></input>
      </form>
    </div>
  );
};

export default SearchBar;
