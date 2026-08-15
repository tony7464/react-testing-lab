// Lets the user sort the table by description or category
function Sort({ onSort }) {
  return (
    <div className="sort-row">
      <label htmlFor="sort-select">Sort by</label>
      <select
        id="sort-select"
        onChange={(e) => {
          onSort(e.target.value);
        }}
      >
        <option value={"description"}>Description</option>
        <option value={"category"}>Category</option>
      </select>
    </div>
  );
}
export default Sort;
