import { Search } from "lucide-react";

export type SelectFilter = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
};

export function FilterBar({
  search,
  onSearch,
  searchPlaceholder = "Buscar…",
  filters = [],
  resultLabel,
}: {
  search: string;
  onSearch: (value: string) => void;
  searchPlaceholder?: string;
  filters?: SelectFilter[];
  resultLabel?: string;
}) {
  return (
    <div className="filter-bar">
      <label className="search-field">
        <Search size={17} aria-hidden="true" />
        <span className="sr-only">{searchPlaceholder}</span>
        <input
          type="search"
          value={search}
          placeholder={searchPlaceholder}
          onChange={(event) => onSearch(event.target.value)}
        />
      </label>
      {filters.map((filter) => (
        <label className="select-field" key={filter.label}>
          <span className="sr-only">{filter.label}</span>
          <select
            value={filter.value}
            onChange={(event) => filter.onChange(event.target.value)}
            aria-label={filter.label}
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      {resultLabel && <span className="filter-bar__count">{resultLabel}</span>}
    </div>
  );
}
