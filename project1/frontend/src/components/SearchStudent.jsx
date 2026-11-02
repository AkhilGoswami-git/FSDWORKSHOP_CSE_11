import '../App.css';
const SearchStudent = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-container">
      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search by student ID or name..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />

        {searchTerm && (
          <button
            type="button"
            className="clear-search"
            onClick={() => onSearch("")}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchStudent;