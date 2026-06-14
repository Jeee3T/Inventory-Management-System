import { Search, Plus, ChevronDown } from 'lucide-react';

function Toolbar({ search, setSearch, category, setCategory, categories, onAddClick }) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <Search size={18} className="icon-muted" />
        <input
          type="text"
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="select-box">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All Categories">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <ChevronDown size={16} className="select-arrow" />
      </div>

      <button className="btn-primary" onClick={onAddClick}>
        <Plus size={18} />
        Add Product
      </button>
    </div>
  );
}

export default Toolbar;