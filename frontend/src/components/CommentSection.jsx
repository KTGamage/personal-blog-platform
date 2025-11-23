// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { postsAPI } from '../services/api';

// const CommentSection = ({ postId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [commentsLoading, setCommentsLoading] = useState(true);

//   const { user } = useAuth();

//   useEffect(() => {
//     fetchComments();
//   }, [postId]);

//   const fetchComments = async () => {
//     try {
//       const response = await postsAPI.getComments(postId);
//       setComments(response.data);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     } finally {
//       setCommentsLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     setLoading(true);
//     try {
//       const response = await postsAPI.addComment(postId, {
//         content: newComment.trim()
//       });
//       setComments(prev => [...prev, response.data]);
//       setNewComment('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (commentsLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-32">
//         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="card p-6 mt-8">
//       <h3 className="text-xl font-bold text-gray-900 mb-6">
//         Comments ({comments.length})
//       </h3>

//       {/* Add Comment Form */}
//       {user ? (
//         <form onSubmit={handleSubmit} className="mb-8">
//           <div className="flex space-x-4">
//             <img
//               src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=0ea5e9&color=fff`}
//               alt={user.username}
//               className="w-10 h-10 rounded-full flex-shrink-0"
//             />
//             <div className="flex-1">
//               <textarea
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Add a comment..."
//                 rows="3"
//                 className="input-field w-full resize-none"
//                 required
//               />
//               <div className="flex justify-end mt-2">
//                 <button
//                   type="submit"
//                   disabled={loading || !newComment.trim()}
//                   className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Posting...' : 'Post Comment'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       ) : (
//         <div className="text-center py-4 mb-6 border border-gray-200 rounded-lg">
//           <p className="text-gray-600">
//             Please <a href="/login" className="text-primary-600 hover:underline">sign in</a> to leave a comment.
//           </p>
//         </div>
//       )}

//       {/* Comments List */}
//       <div className="space-y-6">
//         {comments.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
//         ) : (
//           comments.map((comment) => (
//             <div key={comment._id} className="flex space-x-4">
//               <img
//                 src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.username}&background=0ea5e9&color=fff`}
//                 alt={comment.author.username}
//                 className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
//               />
//               <div className="flex-1">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="font-medium text-gray-900">
//                       {comment.author.username}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       {formatDate(comment.createdAt)}
//                     </span>
//                   </div>
//                   <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// };

// export default CommentSection;








import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await postsAPI.getComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await postsAPI.addComment(postId, {
        content: newComment.trim()
      });
      setComments(prev => [...prev, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (commentsLoading) {
    return (
      <div className="flex justify-center items-center min-h-32">
        <div className="loading-spinner w-6 h-6"></div>
      </div>
    );
  }

  return (
    <section className="card p-6 mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex space-x-4">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=amber-600&color=fff`}
              alt={user.username}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows="3"
                className="input-field w-full resize-none"
                required
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 mb-6 border border-gray-200 rounded-lg bg-amber-50">
          <p className="text-amber-800">
            Please <a href="/login" className="font-semibold hover:underline">sign in</a> to leave a comment.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex space-x-4">
              <img
                src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.username}&background=amber-600&color=fff`}
                alt={comment.author.username}
                className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {comment.author.username}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;