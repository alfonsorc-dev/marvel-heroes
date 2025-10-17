import { useMemo, useRef } from "react";
import "./SearchBar.scss";
import searchIcon from "@/assets/magnifying-glass.svg";

export type SearchBarProps = {
  resultsCount: number | undefined;
  onChange: (value: string | null) => void;
};

const SearchBar = ({ onChange, resultsCount }: SearchBarProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const getFormValue = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    return formData.get("query");
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const query = getFormValue(event);
    onChange(query as string | null);
  };

  const resultsCountMsg: string | undefined = useMemo(() => {
    if (resultsCount === undefined) return;
    return `${resultsCount ?? 0} result${resultsCount === 1 ? "" : "s"} found`;
  }, [resultsCount]);

  return (
    <div className="search-bar" data-testid="search-bar">
      <form ref={formRef} onChange={handleChange}>
        <div className="search-bar__magnifying-icon">
          <img src={searchIcon} alt="Search Icon" />
        </div>
        <input
          name="query"
          type="text"
          placeholder="SEARCH A CHARACTER..."
          className="search-bar__input"
          aria-label="Search input"
        ></input>
      </form>
      <div role="status" className="search-bar__results-count">
        {resultsCountMsg}
      </div>
    </div>
  );
};

export default SearchBar;
