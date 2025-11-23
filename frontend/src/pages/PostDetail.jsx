// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import { postsAPI } from '../services/api';
// // import CommentSection from '../components/CommentSection';
// // import SpeechControls from '../components/SpeechControls';
// // import TranslationControls from '../components/TranslationControls';
// // const PostDetail = () => {
// //   const [post, setPost] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [likeLoading, setLikeLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const { user } = useAuth();
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchPost();
// //   }, [id]);

// //   const fetchPost = async () => {
// //     try {
// //       const response = await postsAPI.getPost(id);
// //       setPost(response.data);
// //     } catch (error) {
// //       setError('Post not found');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleLike = async () => {
// //     if (!user) {
// //       navigate('/login');
// //       return;
// //     }

// //     setLikeLoading(true);
// //     try {
// //       const response = await postsAPI.likePost(id);
// //       setPost(prev => ({
// //         ...prev,
// //         likes: response.data.likes,
// //         likesCount: response.data.likesCount
// //       }));
// //     } catch (error) {
// //       console.error('Error liking post:', error);
// //     } finally {
// //       setLikeLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!window.confirm('Are you sure you want to delete this post?')) {
// //       return;
// //     }

// //     try {
// //       await postsAPI.deletePost(id);
// //       navigate('/');
// //     } catch (error) {
// //       setError('Failed to delete post');
// //     }
// //   };

// //   const isLiked = user && post?.likes.some(like => like._id === user._id);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-64">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
// //       </div>
// //     );
// //   }

// //   if (error || !post) {
// //     return (
// //       <div className="text-center py-12">
// //         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
// //         <Link to="/" className="btn-primary">
// //           Back to Home
// //         </Link>
// //       </div>
// //     );
// //   }

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto">
// //       <article className="card p-6 dark:bg-gray-800">
// //         {/* Post Header */}
// //         <header className="mb-8">
// //           {post.coverImage && (
// //             <div className="mb-6">
// //               <img
// //                 src={post.coverImage}
// //                 alt={post.title}
// //                 className="w-full h-64 object-cover rounded-lg"
// //               />
// //             </div>
// //           )}

// //           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
// //             {post.title}
// //           </h1>

// //           <div className="flex items-center justify-between mb-6">
// //             <div className="flex items-center space-x-4">
// //               <Link
// //                 to={`/profile/${post.author._id}`}
// //                 className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
// //               >
// //                 <img
// //                   src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.username}&background=0ea5e9&color=fff`}
// //                   alt={post.author.username}
// //                   className="w-10 h-10 rounded-full"
// //                 />
// //                 <div>
// //                   <div className="font-medium text-gray-900 dark:text-white">{post.author.username}</div>
// //                   <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</div>
// //                 </div>
// //               </Link>
// //             </div>

// //             {user && user._id === post.author._id && (
// //               <div className="flex space-x-2">
// //                 <Link
// //                   to={`/edit-post/${post._id}`}
// //                   className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
// //                 >
// //                   Edit
// //                 </Link>
// //                 <button
// //                   onClick={handleDelete}
// //                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           {(post.tags?.length > 0 || post.category) && (
// //             <div className="flex flex-wrap items-center gap-2 mb-4">
// //               {post.category && (
// //                 <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
// //                   {post.category}
// //                 </span>
// //               )}
// //               {post.tags.map((tag, index) => (
// //                 <span
// //                   key={index}
// //                   className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
// //                 >
// //                   #{tag}
// //                 </span>
// //               ))}
// //             </div>
// //           )}
// //         </header>

// //         {/* Text-to-Speech Controls */}
// //         <SpeechControls content={post.content} className="mb-6" />

// //         {/* Translation Controls */}
// //         <TranslationControls content={post.content} className="mb-6" />

// //         {/* Post Content */}
// //         <div 
// //           className="prose prose-lg max-w-none mb-8 dark:prose-invert"
// //           dangerouslySetInnerHTML={{ __html: post.content }}
// //         />

// //         {/* Post Actions */}
// //         <footer className="border-t border-gray-200 dark:border-gray-700 pt-6">
// //           <div className="flex items-center justify-between">
// //             <button
// //               onClick={handleLike}
// //               disabled={likeLoading}
// //               className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
// //                 isLiked 
// //                   ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30' 
// //                   : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
// //               }`}
// //             >
// //               <svg 
// //                 className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} 
// //                 fill={isLiked ? 'currentColor' : 'none'} 
// //                 stroke="currentColor" 
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
// //               </svg>
// //               <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
// //             </button>

// //             <div className="text-sm text-gray-500 dark:text-gray-400">
// //               {post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}
// //             </div>
// //           </div>
// //         </footer>
// //       </article>

// //       {/* Comments Section */}
// //       <CommentSection postId={id} />
// //     </div>
// //   );
// // };

// // export default PostDetail;






// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import { postsAPI } from '../services/api';
// // import CommentSection from '../components/CommentSection';
// // import SpeechControls from '../components/SpeechControls';
// // import TranslationControls from '../components/TranslationControls';
// // import '../components/RichTextEditor.css'; 

// // const PostDetail = () => {
// //   const [post, setPost] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [likeLoading, setLikeLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const { user } = useAuth();
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchPost();
// //   }, [id]);

// //   const fetchPost = async () => {
// //     try {
// //       const response = await postsAPI.getPost(id);
// //       setPost(response.data);
// //     } catch (error) {
// //       setError('Post not found');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleLike = async () => {
// //     if (!user) {
// //       navigate('/login');
// //       return;
// //     }

// //     setLikeLoading(true);
// //     try {
// //       const response = await postsAPI.likePost(id);
// //       setPost(prev => ({
// //         ...prev,
// //         likes: response.data.likes,
// //         likesCount: response.data.likesCount
// //       }));
// //     } catch (error) {
// //       console.error('Error liking post:', error);
// //     } finally {
// //       setLikeLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!window.confirm('Are you sure you want to delete this post?')) {
// //       return;
// //     }

// //     try {
// //       await postsAPI.deletePost(id);
// //       navigate('/');
// //     } catch (error) {
// //       setError('Failed to delete post');
// //     }
// //   };

// //   const isLiked = user && post?.likes.some(like => like._id === user._id);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-64">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
// //       </div>
// //     );
// //   }

// //   if (error || !post) {
// //     return (
// //       <div className="text-center py-12">
// //         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
// //         <Link to="/" className="btn-primary">
// //           Back to Home
// //         </Link>
// //       </div>
// //     );
// //   }

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
// //       <article className="card p-6 dark:bg-gray-800 overflow-hidden">
// //         {/* Post Header */}
// //         <header className="mb-8">
// //           {post.coverImage && (
// //             <div className="mb-6 -mx-6">
// //               <img
// //                 src={post.coverImage}
// //                 alt={post.title}
// //                 className="w-full h-64 object-cover"
// //               />
// //             </div>
// //           )}

// //           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 break-words">
// //             {post.title}
// //           </h1>

// //           <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
// //             <div className="flex items-center space-x-4">
// //               <Link
// //                 to={`/profile/${post.author._id}`}
// //                 className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
// //               >
// //                 <img
// //                   src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.username}&background=0ea5e9&color=fff`}
// //                   alt={post.author.username}
// //                   className="w-10 h-10 rounded-full"
// //                 />
// //                 <div>
// //                   <div className="font-medium text-gray-900 dark:text-white">{post.author.username}</div>
// //                   <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</div>
// //                 </div>
// //               </Link>
// //             </div>

// //             {user && user._id === post.author._id && (
// //               <div className="flex space-x-2">
// //                 <Link
// //                   to={`/edit-post/${post._id}`}
// //                   className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
// //                 >
// //                   Edit
// //                 </Link>
// //                 <button
// //                   onClick={handleDelete}
// //                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           {(post.tags?.length > 0 || post.category) && (
// //             <div className="flex flex-wrap items-center gap-2 mb-4">
// //               {post.category && (
// //                 <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
// //                   {post.category}
// //                 </span>
// //               )}
// //               {post.tags.map((tag, index) => (
// //                 <span
// //                   key={index}
// //                   className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
// //                 >
// //                   #{tag}
// //                 </span>
// //               ))}
// //             </div>
// //           )}
// //         </header>

// //         {/* Text-to-Speech Controls */}
// //         <SpeechControls content={post.content} className="mb-6" />

// //         {/* Translation Controls */}
// //         <TranslationControls content={post.content} className="mb-6" />

// //         {/* Post Content */}
// //         <div 
// //           className="rich-text-content mb-8 w-full max-w-none overflow-hidden"
// //           dangerouslySetInnerHTML={{ __html: post.content }}
// //         />

// //         {/* Post Actions */}
// //         <footer className="border-t border-gray-200 dark:border-gray-700 pt-6">
// //           <div className="flex items-center justify-between flex-wrap gap-4">
// //             <button
// //               onClick={handleLike}
// //               disabled={likeLoading}
// //               className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
// //                 isLiked 
// //                   ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30' 
// //                   : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
// //               }`}
// //             >
// //               <svg 
// //                 className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} 
// //                 fill={isLiked ? 'currentColor' : 'none'} 
// //                 stroke="currentColor" 
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
// //               </svg>
// //               <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
// //             </button>

// //             <div className="text-sm text-gray-500 dark:text-gray-400">
// //               {post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}
// //             </div>
// //           </div>
// //         </footer>
// //       </article>

// //       {/* Comments Section */}
// //       <CommentSection postId={id} />
// //     </div>
// //   );
// // };

// // export default PostDetail;


// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { postsAPI } from '../services/api';
// import CommentSection from '../components/CommentSection';
// import SpeechControls from '../components/SpeechControls';
// import TranslationControls from '../components/TranslationControls';
// import '../components/RichTextEditor.css';

// const PostDetail = () => {
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [likeLoading, setLikeLoading] = useState(false);
//   const [error, setError] = useState('');

//   const { user } = useAuth();
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPost();
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const response = await postsAPI.getPost(id);
//       setPost(response.data);
//     } catch (error) {
//       setError('Post not found');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async () => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     setLikeLoading(true);
//     try {
//       const response = await postsAPI.likePost(id);
//       setPost(prev => ({
//         ...prev,
//         likes: response.data.likes,
//         likesCount: response.data.likesCount
//       }));
//     } catch (error) {
//       console.error('Error liking post:', error);
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete this post?')) {
//       return;
//     }

//     try {
//       await postsAPI.deletePost(id);
//       navigate('/');
//     } catch (error) {
//       setError('Failed to delete post');
//     }
//   };

//   const isLiked = user && post?.likes.some(like => like._id === user._id);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-lg"></div>
//           </div>
//           <p className="mt-4 text-gray-600 dark:text-gray-400">Loading amazing content...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/30 rounded-2xl p-8 shadow-2xl">
//           <div className="w-24 h-24 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
//           <Link 
//             to="/" 
//             className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//           >
//             <span>Back to Home</span>
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Animated background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
      
//       <div className="relative">
//         {/* Post Header */}
//         <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
//           {post.coverImage && (
//             <div className="mb-8 -mx-8 -mt-8 overflow-hidden rounded-t-2xl">
//               <img
//                 src={post.coverImage}
//                 alt={post.title}
//                 className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-700"
//               />
//             </div>
//           )}

//           <div className="flex items-start justify-between mb-6">
//             <div className="flex-1">
//               <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 {post.title}
//               </h1>

//               <div className="flex items-center space-x-4 mb-6">
//                 <Link
//                   to={`/profile/${post.author._id}`}
//                   className="flex items-center space-x-4 group"
//                 >
//                   <div className="relative">
//                     <img
//                       src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.username}&background=random&color=fff`}
//                       alt={post.author.username}
//                       className="w-12 h-12 rounded-full ring-2 ring-cyan-500/50 group-hover:ring-purple-500/50 transition-all duration-300"
//                     />
//                     <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900"></div>
//                   </div>
//                   <div>
//                     <div className="font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
//                       {post.author.username}
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</div>
//                   </div>
//                 </Link>
//               </div>

//               {(post.tags?.length > 0 || post.category) && (
//                 <div className="flex flex-wrap items-center gap-3 mb-6">
//                   {post.category && (
//                     <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
//                       {post.category}
//                     </span>
//                   )}
//                   {post.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full transition-all duration-300 hover:bg-white dark:hover:bg-gray-800"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {user && user._id === post.author._id && (
//               <div className="flex space-x-3">
//                 <Link
//                   to={`/edit-post/${post._id}`}
//                   className="flex items-center space-x-2 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-xl hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                   <span>Edit</span>
//                 </Link>
//                 <button
//                   onClick={handleDelete}
//                   className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                   </svg>
//                   <span>Delete</span>
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Text-to-Speech Controls */}
//           <SpeechControls content={post.content} className="mb-6" />

//           {/* Translation Controls */}
//           <TranslationControls content={post.content} className="mb-6" />

//           {/* Post Content */}
//           <div 
//             className="rich-text-content mb-8 w-full max-w-none overflow-hidden text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
//             dangerouslySetInnerHTML={{ __html: post.content }}
//           />

//           {/* Post Actions */}
//           <footer className="border-t border-white/20 dark:border-gray-700/30 pt-6">
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={handleLike}
//                 disabled={likeLoading}
//                 className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
//                   isLiked 
//                     ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
//                     : 'backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 shadow-lg'
//                 }`}
//               >
//                 <svg 
//                   className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} 
//                   fill={isLiked ? 'currentColor' : 'none'} 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//                 <span className="font-semibold">{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
//               </button>

//               <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//                 <span className="font-semibold">{post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}</span>
//               </div>
//             </div>
//           </footer>
//         </div>

//         {/* Comments Section */}
//         <CommentSection postId={id} />
//       </div>
//     </div>
//   );
// };

// export default PostDetail;








import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import CommentSection from '../components/CommentSection';
import SpeechControls from '../components/SpeechControls';
import TranslationControls from '../components/TranslationControls';
import '../components/RichTextEditor.css';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getPost(id);
      setPost(response.data);
    } catch (error) {
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLikeLoading(true);
    try {
      const response = await postsAPI.likePost(id);
      setPost(prev => ({
        ...prev,
        likes: response.data.likes,
        likesCount: response.data.likesCount
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postsAPI.deletePost(id);
      navigate('/');
    } catch (error) {
      setError('Failed to delete post');
    }
  };

  const isLiked = user && post?.likes.some(like => like._id === user._id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center card p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
          <Link 
            to="/" 
            className="btn-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <article className="card p-6 mb-8">
          {/* Post Header */}
          <header className="mb-8">
            {post.coverImage && (
              <div className="mb-6 -mx-6">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-words">
              {post.title}
            </h1>

            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <Link
                  to={`/profile/${post.author._id}`}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.username}&background=amber-600&color=fff`}
                    alt={post.author.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{post.author.username}</div>
                    <div className="text-sm text-gray-500">{formatDate(post.createdAt)}</div>
                  </div>
                </Link>
              </div>

              {user && user._id === post.author._id && (
                <div className="flex space-x-2">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="btn-secondary text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {(post.tags?.length > 0 || post.category) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {post.category && (
                  <span className="px-3 py-1 bg-amber-600 text-white text-sm rounded-full">
                    {post.category}
                  </span>
                )}
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Text-to-Speech Controls */}
          <SpeechControls content={post.content} className="mb-6" />

          {/* Translation Controls */}
          <TranslationControls content={post.content} className="mb-6" />

          {/* Post Content */}
          <div 
            className="rich-text-content mb-8 w-full max-w-none overflow-hidden"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Actions */}
          <footer className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg 
                  className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} 
                  fill={isLiked ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
              </button>

              <div className="text-sm text-gray-500">
                {post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}
              </div>
            </div>
          </footer>
        </article>

        {/* Comments Section */}
        <CommentSection postId={id} />
      </div>
    </div>
  );
};

export default PostDetail;