// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { postsAPI } from '../services/api';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const EditPost = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     coverImage: '',
//     tags: '',
//     category: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     fetchPost();
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const response = await postsAPI.getPost(id);
//       const post = response.data;

//       setFormData({
//         title: post.title,
//         content: post.content,
//         coverImage: post.coverImage || '',
//         tags: post.tags?.join(', ') || '',
//         category: post.category || ''
//       });
//     } catch (error) {
//       setError('Failed to load post');
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleContentChange = (content) => {
//     setFormData({
//       ...formData,
//       content
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

//       const postData = {
//         ...formData,
//         tags: tagsArray
//       };

//       await postsAPI.updatePost(id, postData);
//       navigate(`/post/${id}`);
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };

//   if (fetchLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="card p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="input-field text-lg"
//               placeholder="Enter post title"
//             />
//           </div>

//           <div>
//             <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
//               Cover Image URL
//             </label>
//             <input
//               type="url"
//               id="coverImage"
//               name="coverImage"
//               value={formData.coverImage}
//               onChange={handleChange}
//               className="input-field"
//               placeholder="https://example.com/image.jpg"
//             />
//           </div>

//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <input
//               type="text"
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="input-field"
//               placeholder="e.g., Technology, Lifestyle, Travel"
//             />
//           </div>

//           <div>
//             <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
//               Tags
//             </label>
//             <input
//               type="text"
//               id="tags"
//               name="tags"
//               value={formData.tags}
//               onChange={handleChange}
//               className="input-field"
//               placeholder="Separate tags with commas: react, javascript, webdev"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Content
//             </label>
//             <ReactQuill
//               value={formData.content}
//               onChange={handleContentChange}
//               modules={modules}
//               theme="snow"
//               className="h-64 mb-12"
//             />
//           </div>

//           <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={() => navigate(`/post/${id}`)}
//               className="btn-secondary"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading || !formData.title || !formData.content}
//               className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Updating...' : 'Update Post'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPost;

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { postsAPI } from '../services/api';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import '../components/RichTextEditor.css';

// const EditPost = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     coverImage: '',
//     tags: '',
//     category: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [previewMode, setPreviewMode] = useState(false);
//   const quillRef = useRef(null);

//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     fetchPost();
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const response = await postsAPI.getPost(id);
//       const post = response.data;

//       setFormData({
//         title: post.title,
//         content: post.content,
//         coverImage: post.coverImage || '',
//         tags: post.tags?.join(', ') || '',
//         category: post.category || ''
//       });
//     } catch (error) {
//       setError('Failed to load post');
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleContentChange = (content) => {
//     setFormData({
//       ...formData,
//       content
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

//       const postData = {
//         ...formData,
//         tags: tagsArray
//       };

//       await postsAPI.updatePost(id, postData);
//       navigate(`/post/${id}`);
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Enhanced toolbar modules (same as CreatePost)
//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//         [{ 'font': [] }],
//         [{ 'size': ['small', false, 'large', 'huge'] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'script': 'sub'}, { 'script': 'super' }],
//         ['blockquote', 'code-block'],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
//         [{ 'indent': '-1'}, { 'indent': '+1' }],
//         [{ 'direction': 'rtl' }],
//         [{ 'align': [] }],
//         ['link', 'image', 'video'],
//         ['clean']
//       ],
//       handlers: {
//         // Custom handlers can be added here
//       }
//     },
//     clipboard: {
//       matchVisual: false,
//     }
//   };

//   const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'script',
//     'blockquote', 'code-block',
//     'list', 'bullet', 'check',
//     'indent',
//     'direction',
//     'align',
//     'link', 'image', 'video'
//   ];

//   // Sample categories for dropdown
//   const categories = [
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
//     'Software Engineering'
//   ];

//   // Sample tags for suggestions
//   const suggestedTags = [
//     'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Vue', 'Angular',
//     'Java', 'CSS', 'HTML', 'Next.js', 'Express', 'MongoDB', 'PostgreSQL',
//     'Docker', 'Kubernetes', 'AWS', 'Git', 'REST API', 'GraphQL'
//   ];

//   const handleTagSuggestionClick = (tag) => {
//     const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
//     if (!currentTags.includes(tag)) {
//       const newTags = [...currentTags, tag].join(', ');
//       setFormData(prev => ({ ...prev, tags: newTags }));
//     }
//   };

//   if (fetchLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="card p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
//           <button
//             type="button"
//             onClick={() => setPreviewMode(!previewMode)}
//             className={`px-4 py-2 rounded-lg transition-colors text-sm ${
//               previewMode
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {previewMode ? 'Edit Mode' : 'Preview Mode'}
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Left Column - Form Fields */}
//             <div className="space-y-6">
//               <div>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                   Title *
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                   className="input-field text-lg w-full"
//                   placeholder="Enter post title"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
//                   Cover Image URL
//                 </label>
//                 <input
//                   type="url"
//                   id="coverImage"
//                   name="coverImage"
//                   value={formData.coverImage}
//                   onChange={handleChange}
//                   className="input-field w-full"
//                   placeholder="https://example.com/image.jpg"
//                 />
//                 {formData.coverImage && (
//                   <div className="mt-2">
//                     <img
//                       src={formData.coverImage}
//                       alt="Cover preview"
//                       className="h-32 w-full object-cover rounded-lg border"
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="input-field w-full"
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map(category => (
//                     <option key={category} value={category}>{category}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
//                   Tags
//                 </label>
//                 <input
//                   type="text"
//                   id="tags"
//                   name="tags"
//                   value={formData.tags}
//                   onChange={handleChange}
//                   className="input-field w-full"
//                   placeholder="Separate tags with commas: react, javascript, webdev"
//                 />
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {suggestedTags.map(tag => (
//                       <button
//                         key={tag}
//                         type="button"
//                         onClick={() => handleTagSuggestionClick(tag)}
//                         className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
//                       >
//                         {tag}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Editor/Preview */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Content *
//               </label>

//               {previewMode ? (
//                 <div className="border border-gray-300 rounded-lg p-6 bg-white min-h-64 max-h-96 overflow-y-auto">
//                   <div
//                     className="rich-text-content"
//                     dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-500">No content to preview</p>' }}
//                   />
//                 </div>
//               ) : (
//                 <div className="rich-text-editor-container">
//                   <ReactQuill
//                     ref={quillRef}
//                     value={formData.content}
//                     onChange={handleContentChange}
//                     modules={modules}
//                     formats={formats}
//                     theme="snow"
//                     className="h-96 mb-16"
//                     placeholder="Start writing your amazing content..."
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-between items-center pt-6 border-t border-gray-200">
//             <div className="text-sm text-gray-500">
//               Character count: {formData.content.replace(/<[^>]*>/g, '').length}
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 onClick={() => navigate(`/post/${id}`)}
//                 className="btn-secondary"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading || !formData.title || !formData.content}
//                 className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Updating...' : 'Update Post'}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPost;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { postsAPI } from "../services/api";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "../components/RichTextEditor.css";

// const EditPost = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     coverImage: "",
//     tags: "",
//     category: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [previewMode, setPreviewMode] = useState(false);
//   const quillRef = useRef(null);

//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     fetchPost();
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const response = await postsAPI.getPost(id);
//       const post = response.data;

//       setFormData({
//         title: post.title,
//         content: post.content,
//         coverImage: post.coverImage || "",
//         tags: post.tags?.join(", ") || "",
//         category: post.category || "",
//       });
//     } catch (error) {
//       setError("Failed to load post");
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleContentChange = (content) => {
//     setFormData({
//       ...formData,
//       content,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const tagsArray = formData.tags
//         .split(",")
//         .map((tag) => tag.trim())
//         .filter((tag) => tag);

//       const postData = {
//         ...formData,
//         tags: tagsArray,
//       };

//       await postsAPI.updatePost(id, postData);
//       navigate(`/post/${id}`);
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to update post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Enhanced toolbar modules (same as CreatePost)
//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         [{ font: [] }],
//         [{ size: ["small", false, "large", "huge"] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ color: [] }, { background: [] }],
//         [{ script: "sub" }, { script: "super" }],
//         ["blockquote", "code-block"],
//         [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//         [{ indent: "-1" }, { indent: "+1" }],
//         [{ direction: "rtl" }],
//         [{ align: [] }],
//         ["link", "image", "video"],
//         ["clean"],
//       ],
//       handlers: {
//         // Custom handlers can be added here
//       },
//     },
//     clipboard: {
//       matchVisual: false,
//     },
//   };

//   const formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "color",
//     "background",
//     "script",
//     "blockquote",
//     "code-block",
//     "list",
//     "bullet",
//     "check",
//     "indent",
//     "direction",
//     "align",
//     "link",
//     "image",
//     "video",
//   ];

//   // Sample categories for dropdown
//   const categories = [
//     "Technology",
//     "Programming",
//     "Web Development",
//     "Mobile Development",
//     "Data Science",
//     "Artificial Intelligence",
//     "Machine Learning",
//     "DevOps",
//     "Cloud Computing",
//     "Cybersecurity",
//     "UI/UX Design",
//     "Blockchain",
//     "Software Engineering",
//   ];

//   // Sample tags for suggestions
//   const suggestedTags = [
//     "JavaScript",
//     "Python",
//     "React",
//     "Node.js",
//     "TypeScript",
//     "Vue",
//     "Angular",
//     "Java",
//     "CSS",
//     "HTML",
//     "Next.js",
//     "Express",
//     "MongoDB",
//     "PostgreSQL",
//     "Docker",
//     "Kubernetes",
//     "AWS",
//     "Git",
//     "REST API",
//     "GraphQL",
//   ];

//   const handleTagSuggestionClick = (tag) => {
//     const currentTags = formData.tags
//       ? formData.tags.split(",").map((t) => t.trim())
//       : [];
//     if (!currentTags.includes(tag)) {
//       const newTags = [...currentTags, tag].join(", ");
//       setFormData((prev) => ({ ...prev, tags: newTags }));
//     }
//   };

//   if (fetchLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
//         <div className="text-center">
//           <div className="loading-spinner w-8 h-8 mx-auto mb-4 border-2 border-amber-600 dark:border-amber-400 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="card p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
//               Edit Post
//             </h1>
//             <button
//               type="button"
//               onClick={() => setPreviewMode(!previewMode)}
//               className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
//                 previewMode
//                   ? "btn-primary bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white"
//                   : "btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
//               }`}
//             >
//               {previewMode ? "Edit Mode" : "Preview Mode"}
//             </button>
//           </div>

//           {error && (
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//               {/* Left Column - Form Fields */}
//               <div className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="title"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Title *
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     className="input-field text-lg w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
//                     placeholder="Enter post title"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="coverImage"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Cover Image URL
//                   </label>
//                   <input
//                     type="url"
//                     id="coverImage"
//                     name="coverImage"
//                     value={formData.coverImage}
//                     onChange={handleChange}
//                     className="input-field w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
//                     placeholder="https://example.com/image.jpg"
//                   />
//                   {formData.coverImage && (
//                     <div className="mt-2">
//                       <img
//                         src={formData.coverImage}
//                         alt="Cover preview"
//                         className="h-32 w-full object-cover rounded-lg border border-gray-300 dark:border-gray-600"
//                         onError={(e) => {
//                           e.target.style.display = "none";
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="category"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Category
//                   </label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="input-field w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
//                   >
//                     <option
//                       value=""
//                       className="text-gray-500 dark:text-gray-400"
//                     >
//                       Select a category
//                     </option>
//                     {categories.map((category) => (
//                       <option
//                         key={category}
//                         value={category}
//                         className="text-gray-900 dark:text-white"
//                       >
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="tags"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Tags
//                   </label>
//                   <input
//                     type="text"
//                     id="tags"
//                     name="tags"
//                     value={formData.tags}
//                     onChange={handleChange}
//                     className="input-field w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
//                     placeholder="Separate tags with commas: react, javascript, webdev"
//                   />
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                       Suggested tags:
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {suggestedTags.map((tag) => (
//                         <button
//                           key={tag}
//                           type="button"
//                           onClick={() => handleTagSuggestionClick(tag)}
//                           className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-200"
//                         >
//                           {tag}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Editor/Preview */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Content *
//                 </label>

//                 {previewMode ? (
//                   <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 bg-white dark:bg-gray-700 min-h-48 sm:min-h-64 max-h-64 sm:max-h-96 overflow-y-auto">
//                     <div
//                       className="rich-text-content prose prose-lg dark:prose-invert max-w-none"
//                       dangerouslySetInnerHTML={{
//                         __html:
//                           formData.content ||
//                           '<p class="text-gray-500 dark:text-gray-400">No content to preview</p>',
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   <div className="rich-text-editor-container mb-8 sm:mb-12">
//                     <ReactQuill
//                       ref={quillRef}
//                       value={formData.content}
//                       onChange={handleContentChange}
//                       modules={modules}
//                       formats={formats}
//                       theme="snow"
//                       className="h-64 sm:h-80 md:h-96 lg:h-[500px] dark:quill-dark"
//                       placeholder="Start writing your amazing content..."
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
        
//             <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 space-x-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
//               <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left order-2 sm:order-1">
//                 Character count:{" "}
//                 {formData.content.replace(/<[^>]*>/g, "").length}
//               </div>
//               <div className="flex flex-row space-x-3 sm:space-x-4 order-1 sm:order-2">
//                 <button
//                   type="button"
//                   onClick={() => navigate(`/post/${id}`)}
//                   className="btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading || !formData.title || !formData.content}
//                   className="btn-primary bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
//                 >
//                   {loading ? "Updating..." : "Update Post"}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPost;










import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postsAPI } from '../services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../components/RichTextEditor.css';

const EditPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
    tags: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const quillRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getPost(id);
      const post = response.data;
      
      setFormData({
        title: post.title,
        content: post.content,
        coverImage: post.coverImage || '',
        tags: post.tags?.join(', ') || '',
        category: post.category || ''
      });
    } catch (error) {
      setError('Failed to load post');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const postData = {
        ...formData,
        tags: tagsArray
      };

      await postsAPI.updatePost(id, postData);
      navigate(`/post/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced toolbar modules (same as CreatePost)
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        // Custom handlers can be added here
      }
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'blockquote', 'code-block',
    'list', 'bullet', 'check',
    'indent',
    'direction',
    'align',
    'link', 'image', 'video'
  ];

  // Sample categories for dropdown
  const categories = [
    'Technology',
    'Programming',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'DevOps',
    'Cloud Computing',
    'Cybersecurity',
    'UI/UX Design',
    'Blockchain',
    'Software Engineering'
  ];

  // Sample tags for suggestions
  const suggestedTags = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Vue', 'Angular',
    'Java', 'CSS', 'HTML', 'Next.js', 'Express', 'MongoDB', 'PostgreSQL',
    'Docker', 'Kubernetes', 'AWS', 'Git', 'REST API', 'GraphQL'
  ];

  const handleTagSuggestionClick = (tag) => {
    const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
    if (!currentTags.includes(tag)) {
      const newTags = [...currentTags, tag].join(', ');
      setFormData(prev => ({ ...prev, tags: newTags }));
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4 border-2 border-amber-600 dark:border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8 pb-24 sm:pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="card p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm pb-20 lg:pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                previewMode 
                  ? 'btn-primary bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white' 
                  : 'btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              {previewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:gap-8">
              {/* Left Column - Form Fields */}
              <div className="w-full lg:w-1/2 space-y-6 mb-6 lg:mb-0">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="input-field text-lg w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.coverImage && (
                    <div className="mt-2">
                      <img 
                        src={formData.coverImage} 
                        alt="Cover preview" 
                        className="h-32 w-full object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category} className="text-gray-900 dark:text-white">{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                    placeholder="Separate tags with commas: react, javascript, webdev"
                  />
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagSuggestionClick(tag)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-200"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Editor and Mobile Buttons */}
              <div className="w-full lg:w-1/2">
                {/* Editor/Preview */}
                <div className="mb-6 lg:mb-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content *
                  </label>
                  
                  {previewMode ? (
                    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700 min-h-64 max-h-96 overflow-y-auto">
                      <div 
                        className="rich-text-content prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-500 dark:text-gray-400">No content to preview</p>' }}
                      />
                    </div>
                  ) : (
                    <div className="rich-text-editor-container">
                      <ReactQuill
                        ref={quillRef}
                        value={formData.content}
                        onChange={handleContentChange}
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        className="h-80 sm:h-96 lg:h-[500px] dark:quill-dark"
                        placeholder="Start writing your amazing content..."
                      />
                    </div>
                  )}
                </div>

                {/* Buttons - Only visible on mobile */}
                <div className="block lg:hidden mt-20 pt-20 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col space-y-4">
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Character count: {formData.content.replace(/<[^>]*>/g, '').length}
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        type="button"
                        onClick={() => navigate(`/post/${id}`)}
                        className="btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !formData.title || !formData.content}
                        className="btn-primary bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {loading ? 'Updating...' : 'Update Post'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons - Only visible on large screens */}
            <div className="hidden lg:flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Character count: {formData.content.replace(/<[^>]*>/g, '').length}
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(`/post/${id}`)}
                  className="btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.title || !formData.content}
                  className="btn-primary bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Post'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;