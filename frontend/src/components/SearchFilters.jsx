import React, { useState, useEffect, useRef } from "react";
import CategorySelectDropdown from "./CategorySelectDropdown";

const SearchFilters = ({
  onSearch,
  initialCategories = [],
  initialTags = [],
}) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    tag: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const tagsContainerRef = useRef(null);

  // Default categories and tags
  const [categories, setCategories] = useState([
    "Technology",
    "Programming",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "UI/UX Design",
    "Blockchain",
    "Software Engineering",
    "Frontend",
    "Backend",
    "Full Stack",
  ]);

  const [tags, setTags] = useState([
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "TypeScript",
    "Vue",
    "Angular",
    "Java",
    "CSS",
    "HTML",
    "Next.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Git",
    "REST API",
    "GraphQL",
    "Microservices",
    "Testing",
    "Performance",
  ]);

  // Initialize with provided categories and tags if available
  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
    }
    if (initialTags && initialTags.length > 0) {
      setTags(initialTags);
    }
  }, [initialCategories, initialTags]);

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    setFilters(newFilters);
  };

  const handleTagClick = (tag) => {
    let newSelectedTags;

    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }

    setSelectedTags(newSelectedTags);

    const newFilters = {
      ...filters,
      tag: newSelectedTags.join(","),
    };
    setFilters(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "",
      tag: "",
    };
    setFilters(clearedFilters);
    setSelectedTags([]);
    onSearch(clearedFilters);
  };

  const removeTag = (tagToRemove) => {
    const newTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(newTags);
    setFilters((prev) => ({
      ...prev,
      tag: newTags.join(","),
    }));
  };

  const scrollLeft = () => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="card p-6 mb-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Discover Content
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Filter by your interests
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2 dark:text-white"
          >
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Category
            </label>
            <CategorySelectDropdown
              selectedCategory={filters.category}
              onCategoryChange={(category) =>
                handleChange({ target: { name: "category", value: category } })
              }
              categories={categories}
              disabled={false}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 justify-end">
            <div className="flex space-x-4">
              <button type="submit" className="flex-1 btn-primary">
                Apply Filters
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="btn-secondary"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Tags Horizontal Scrollable Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 dark:text-white">
            Popular Tags{" "}
            {selectedTags.length > 0 && `(${selectedTags.length} selected)`}
          </label>
          <div className="relative">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-l-lg p-2 hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Tags Container */}
            <div
              ref={tagsContainerRef}
              className="flex space-x-2 overflow-x-auto py-2 px-8 border border-gray-300 rounded-lg bg-white scrollbar-hide"
            >
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button
              type="button"
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-r-lg p-2 hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">
              Selected tags:
            </span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-amber-600 hover:text-amber-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {(filters.search || filters.category || selectedTags.length > 0) && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <span className="text-sm font-medium text-amber-800">
                Active Filters:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.search && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-700 border border-amber-200">
                    Search: "{filters.search}"
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, search: "" }))
                      }
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-700 border border-amber-200">
                    Category: {filters.category}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, category: "" }))
                      }
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
