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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4 border-2 border-amber-600 dark:border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center card p-8 max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
          <Link 
            to="/" 
            className="btn-primary bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
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
        <article className="card p-6 mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
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

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 break-words">
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
                    <div className="font-medium text-gray-900 dark:text-white">{post.author.username}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</div>
                  </div>
                </Link>
              </div>

              {user && user._id === post.author._id && (
                <div className="flex space-x-2">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {(post.tags?.length > 0 || post.category) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {post.category && (
                  <span className="px-3 py-1 bg-amber-600 dark:bg-amber-500 text-white text-sm rounded-full">
                    {post.category}
                  </span>
                )}
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm rounded-full"
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
            className="rich-text-content mb-8 w-full max-w-none overflow-hidden prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Actions */}
          <footer className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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

              <div className="text-sm text-gray-500 dark:text-gray-400">
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