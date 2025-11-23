// import React, { useState, useEffect } from "react";
// import { postsAPI } from "../services/api";
// import PostCard from "../components/PostCard";
// import SearchFilters from "../components/SearchFilters";
// import Newsletter from "../components/Newsletter";

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filters, setFilters] = useState({
//     search: "",
//     category: "",
//     tag: "",
//   });

//   useEffect(() => {
//     fetchPosts();
//   }, [currentPage, filters]);

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       const response = await postsAPI.getPosts({
//         page: currentPage,
//         limit: 9,
//         ...filters,
//       });
//       setPosts(response.data.posts);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (newFilters) => {
//     setFilters(newFilters);
//     setCurrentPage(1);
//   };

//   if (loading && posts.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Hero Section */}
//       <section className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//           Welcome to BlogPlatform
//         </h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Discover amazing stories, share your thoughts, and connect with other
//           writers in our community.
//         </p>
//       </section>

//       {/* Search and Filters */}
//       <SearchFilters onSearch={handleSearch} />

//       {/* Posts Grid */}
//       <section className="mb-12">
//         {posts.length === 0 ? (
//           <div className="text-center py-12">
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">
//               No posts found
//             </h3>
//             <p className="text-gray-500">Try adjusting your search criteria</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {posts.map((post) => (
//                 <PostCard key={post._id} post={post} />
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center space-x-2">
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-4 py-2 text-gray-600">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </section>
//       <section className="max-w-2xl mx-auto mt-16">
//         <Newsletter />
//       </section>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from "react";
import { postsAPI } from "../services/api";
import PostCard from "../components/PostCard";
import SearchFilters from "../components/SearchFilters";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    tag: "",
  });

  useEffect(() => {
    fetchPosts();
  }, [currentPage, filters]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPosts({
        page: currentPage,
        limit: 9,
        ...filters,
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4">
              Welcome to BlogPlatform
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              Discover amazing stories, share your thoughts, and connect with other writers in our community.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <div className="mb-8 ">
          <SearchFilters onSearch={handleSearch} />
        </div>

        {/* Posts Grid */}
        <section className="mb-12">
          {posts.length === 0 ? (
            <div className="text-center py-12 card max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post, index) => (
                  <div 
                    key={post._id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Previous</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700 font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="max-w-4xl mx-auto">
          <Newsletter />
        </section>
      </div>
    </div>
  );
};

export default Home;