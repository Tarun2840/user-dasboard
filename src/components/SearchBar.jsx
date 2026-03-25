function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;