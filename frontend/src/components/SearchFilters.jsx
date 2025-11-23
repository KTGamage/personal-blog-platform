// import React, { useState, useEffect, useRef } from 'react';

// const SearchFilters = ({ onSearch, initialCategories = [], initialTags = [] }) => {
//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     tag: ''
//   });

//   const [selectedTags, setSelectedTags] = useState([]);
//   const tagsContainerRef = useRef(null);

//   // Default categories and tags - can be overridden by props
//   const [categories, setCategories] = useState([
//     'Technology',
//     'Programming',
//     'Web Development',
//     'Mobile Development',
//     'Data Science',
//     'Artificial Intelligence',
//     'Machine Learning',
//     'DevOps',
//     'Cloud Computing',
//     'Cybersecurity',
//     'UI/UX Design',
//     'Blockchain',
//     'Software Engineering',
//     'Frontend',
//     'Backend',
//     'Full Stack'
//   ]);

//   const [tags, setTags] = useState([
//     'JavaScript',
//     'Python',
//     'React',
//     'Node.js',
//     'TypeScript',
//     'Vue',
//     'Angular',
//     'Java',
//     'CSS',
//     'HTML',
//     'Next.js',
//     'Express',
//     'MongoDB',
//     'PostgreSQL',
//     'MySQL',
//     'Docker',
//     'Kubernetes',
//     'AWS',
//     'Azure',
//     'Git',
//     'REST API',
//     'GraphQL',
//     'Microservices',
//     'Testing',
//     'Performance'
//   ]);

//   // Initialize with provided categories and tags if available
//   useEffect(() => {
//     if (initialCategories && initialCategories.length > 0) {
//       setCategories(initialCategories);
//     }
//     if (initialTags && initialTags.length > 0) {
//       setTags(initialTags);
//     }
//   }, [initialCategories, initialTags]);

//   const handleChange = (e) => {
//     const newFilters = {
//       ...filters,
//       [e.target.name]: e.target.value
//     };
//     setFilters(newFilters);
//   };

//   const handleTagClick = (tag) => {
//     let newSelectedTags;
    
//     if (selectedTags.includes(tag)) {
//       // Remove tag if already selected
//       newSelectedTags = selectedTags.filter(t => t !== tag);
//     } else {
//       // Add tag if not selected
//       newSelectedTags = [...selectedTags, tag];
//     }
    
//     setSelectedTags(newSelectedTags);
    
//     const newFilters = {
//       ...filters,
//       tag: newSelectedTags.join(',')
//     };
//     setFilters(newFilters);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(filters);
//   };

//   const clearFilters = () => {
//     const clearedFilters = {
//       search: '',
//       category: '',
//       tag: ''
//     };
//     setFilters(clearedFilters);
//     setSelectedTags([]);
//     onSearch(clearedFilters);
//   };

//   const removeTag = (tagToRemove) => {
//     const newTags = selectedTags.filter(tag => tag !== tagToRemove);
//     setSelectedTags(newTags);
//     setFilters(prev => ({
//       ...prev,
//       tag: newTags.join(',')
//     }));
//   };

//   // Scroll buttons functionality
//   const scrollLeft = () => {
//     if (tagsContainerRef.current) {
//       tagsContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (tagsContainerRef.current) {
//       tagsContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6 md:mb-8 shadow-sm">
//       <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:items-end">
        
//         {/* Search Input - Full width on mobile, then responsive */}
//         <div className="md:col-span-2 lg:col-span-1">
//           <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Search Posts
//           </label>
//           <input
//             type="text"
//             id="search"
//             name="search"
//             value={filters.search}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
//             placeholder="Search by title or content..."
//           />
//         </div>

//         {/* Category Dropdown */}
//         <div>
//           <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Category
//           </label>
//           <div className="relative">
//             <select
//               id="category"
//               name="category"
//               value={filters.category}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none text-sm"
//             >
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
//               <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Tags Horizontal Scrollable Bar */}
//         <div className="md:col-span-2 lg:col-span-1">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Tags {selectedTags.length > 0 && `(${selectedTags.length} selected)`}
//           </label>
//           <div className="relative">
//             {/* Scroll Left Button */}
//             <button
//               type="button"
//               onClick={scrollLeft}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md p-1 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//             >
//               <svg className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             {/* Tags Container */}
//             <div
//               ref={tagsContainerRef}
//               className="flex space-x-2 overflow-x-auto py-2 px-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 scrollbar-hide"
//               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//             >
//               {tags.map((tag) => (
//                 <button
//                   key={tag}
//                   type="button"
//                   onClick={() => handleTagClick(tag)}
//                   className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//                     selectedTags.includes(tag)
//                       ? 'bg-blue-600 text-white border border-blue-600'
//                       : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-500'
//                   }`}
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>

//             {/* Scroll Right Button */}
//             <button
//               type="button"
//               onClick={scrollRight}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-r-md p-1 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//             >
//               <svg className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//           {/* <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//             Click tags to select/deselect
//           </div> */}
//         </div>

//         {/* Action Buttons - Stack on mobile, inline on larger screens */}
//         <div className="flex flex-col sm:flex-row gap-2 md:flex-col lg:flex-row">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm"
//           >
//             Apply Filters
//           </button>
//           <button
//             type="button"
//             onClick={clearFilters}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
//           >
//             Clear All
//           </button>
//         </div>
//       </form>

//       {/* Selected Tags Display */}
//       {selectedTags.length > 0 && (
//         <div className="mt-4">
//           <div className="flex flex-wrap gap-2">
//             {selectedTags.map((tag) => (
//               <span 
//                 key={tag} 
//                 className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
//               >
//                 {tag}
//                 <button
//                   type="button"
//                   onClick={() => removeTag(tag)}
//                   className="ml-2 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
//                 >
//                   ×
//                 </button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Active Filters Display - Hidden on very small screens */}
//       {(filters.search || filters.category || selectedTags.length > 0) && (
//         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex-1">
//               <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Active Filters:</span>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {filters.search && (
//                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
//                     Search: "{filters.search}"
//                     <button
//                       onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
//                       className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 )}
//                 {filters.category && (
//                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
//                     Category: {filters.category}
//                     <button
//                       onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
//                       className="ml-1 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 )}
//                 {selectedTags.length > 0 && selectedTags.map(tag => (
//                   <span 
//                     key={tag}
//                     className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
//                   >
//                     Tag: {tag}
//                     <button
//                       onClick={() => removeTag(tag)}
//                       className="ml-1 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <button
//               onClick={clearFilters}
//               className="mt-2 sm:mt-0 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
//             >
//               Clear All
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchFilters;



import React, { useState, useEffect, useRef } from 'react';

const SearchFilters = ({ onSearch, initialCategories = [], initialTags = [] }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tag: ''
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const tagsContainerRef = useRef(null);

  // Default categories and tags
  const [categories, setCategories] = useState([
    'Technology', 'Programming', 'Web Development', 'Mobile Development', 
    'Data Science', 'Artificial Intelligence', 'Machine Learning', 'DevOps',
    'Cloud Computing', 'Cybersecurity', 'UI/UX Design', 'Blockchain',
    'Software Engineering', 'Frontend', 'Backend', 'Full Stack'
  ]);

  const [tags, setTags] = useState([
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Vue', 'Angular',
    'Java', 'CSS', 'HTML', 'Next.js', 'Express', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Git', 'REST API',
    'GraphQL', 'Microservices', 'Testing', 'Performance'
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
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
  };

  const handleTagClick = (tag) => {
    let newSelectedTags;
    
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter(t => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }
    
    setSelectedTags(newSelectedTags);
    
    const newFilters = {
      ...filters,
      tag: newSelectedTags.join(',')
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
    setSelectedTags([]);
    onSearch(clearedFilters);
  };

  const removeTag = (tagToRemove) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    setFilters(prev => ({
      ...prev,
      tag: newTags.join(',')
    }));
  };

  const scrollLeft = () => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="card p-6 mb-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Discover Content</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Filter by your interests</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
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
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 justify-end">
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
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
            Popular Tags {selectedTags.length > 0 && `(${selectedTags.length} selected)`}
          </label>
          <div className="relative">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-l-lg p-2 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">Selected tags:</span>
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
              <span className="text-sm font-medium text-amber-800">Active Filters:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.search && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-700 border border-amber-200">
                    Search: "{filters.search}"
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
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
                      onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
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