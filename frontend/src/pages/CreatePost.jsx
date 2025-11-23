// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { postsAPI } from '../services/api';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import '../components/RichTextEditor.css';

// const CreatePost = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     coverImage: '',
//     tags: '',
//     category: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [previewMode, setPreviewMode] = useState(false);
//   const quillRef = useRef(null);

//   const navigate = useNavigate();

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

//       const response = await postsAPI.createPost(postData);
//       navigate(`/post/${response.data._id}`);
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to create post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Enhanced toolbar modules
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

//   const insertSampleContent = () => {
//     const sampleContent = `
//       <h1>Welcome to Your Blog Post</h1>
//       <p>This is a sample paragraph to show you how your content will look. You can <strong>bold text</strong>, <em>italicize text</em>, and <u>underline important points</u>.</p>
      
//       <h2>Key Features</h2>
//       <ul>
//         <li>Rich text formatting</li>
//         <li>Multiple heading levels</li>
//         <li>Code blocks</li>
//         <li>And much more!</li>
//       </ul>
      
//       <blockquote>
//         This is a blockquote. Use it to highlight important quotes or insights.
//       </blockquote>
      
//       <h3>Code Example</h3>
//       <pre><code class="language-javascript">function helloWorld() {
//   console.log("Hello, world!");
// }</code></pre>
//     `;
    
//     setFormData(prev => ({ ...prev, content: sampleContent }));
    
//     // Focus the editor
//     if (quillRef.current) {
//       const editor = quillRef.current.getEditor();
//       editor.focus();
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="card p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
//           <div className="flex space-x-3">
//             <button
//               type="button"
//               onClick={insertSampleContent}
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
//             >
//               Insert Sample
//             </button>
//             <button
//               type="button"
//               onClick={() => setPreviewMode(!previewMode)}
//               className={`px-4 py-2 rounded-lg transition-colors text-sm ${
//                 previewMode 
//                   ? 'bg-blue-600 text-white' 
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {previewMode ? 'Edit Mode' : 'Preview Mode'}
//             </button>
//           </div>
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
//                     className="prose prose-lg max-w-none"
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
//                 onClick={() => navigate('/')}
//                 className="btn-secondary"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading || !formData.title || !formData.content}
//                 className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Publishing...' : 'Publish Post'}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;







import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../components/RichTextEditor.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
    tags: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const quillRef = useRef(null);

  const navigate = useNavigate();

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

      const response = await postsAPI.createPost(postData);
      navigate(`/post/${response.data._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced toolbar modules
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

  const insertSampleContent = () => {
    const sampleContent = `
      <h1>Welcome to Your Blog Post</h1>
      <p>This is a sample paragraph to show you how your content will look. You can <strong>bold text</strong>, <em>italicize text</em>, and <u>underline important points</u>.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Rich text formatting</li>
        <li>Multiple heading levels</li>
        <li>Code blocks</li>
        <li>And much more!</li>
      </ul>
      
      <blockquote>
        This is a blockquote. Use it to highlight important quotes or insights.
      </blockquote>
      
      <h3>Code Example</h3>
      <pre><code class="language-javascript">function helloWorld() {
  console.log("Hello, world!");
}</code></pre>
    `;
    
    setFormData(prev => ({ ...prev, content: sampleContent }));
    
    // Focus the editor
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.focus();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="card p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                <p className="text-gray-600 text-sm">Share your thoughts with the world</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={insertSampleContent}
                className="btn-secondary text-sm"
              >
                Insert Sample
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className={`text-sm ${
                  previewMode 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}
              >
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="input-field text-lg"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.coverImage && (
                    <div className="mt-2">
                      <img 
                        src={formData.coverImage} 
                        alt="Cover preview" 
                        className="h-32 w-full object-cover rounded-lg border"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Separate tags with commas: react, javascript, webdev"
                  />
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagSuggestionClick(tag)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Editor/Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                
                {previewMode ? (
                  <div className="border border-gray-300 rounded-lg p-6 bg-white min-h-64 max-h-96 overflow-y-auto">
                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-500">No content to preview</p>' }}
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
                      className="h-96 mb-16"
                      placeholder="Start writing your amazing content..."
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                Character count: {formData.content.replace(/<[^>]*>/g, '').length}
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.title || !formData.content}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;