import React, { useState } from 'react';

const SearchFilters = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tag: ''
  });

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      tag: ''
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  return (
    <div className="card p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:space-x-4 md:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Posts
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            className="input-field"
            placeholder="Search by title or content..."
          />
        </div>

        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="input-field"
            placeholder="Filter by category..."
          />
        </div>

        <div className="flex-1">
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={filters.tag}
            onChange={handleChange}
            className="input-field"
            placeholder="Filter by tag..."
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="btn-primary whitespace-nowrap"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="btn-secondary whitespace-nowrap"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;