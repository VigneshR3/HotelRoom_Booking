export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search hotels..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
}
