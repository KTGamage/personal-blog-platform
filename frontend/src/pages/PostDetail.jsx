import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import CommentSection from '../components/CommentSection';

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
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
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
    <div className="max-w-4xl mx-auto">
      <article className="card p-8">
        {/* Post Header */}
        <header className="mb-8">
          {post.coverImage && (
            <div className="mb-6">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to={`/profile/${post.author._id}`}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <img
                  src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.username}&background=0ea5e9&color=fff`}
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
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {(post.tags?.length > 0 || post.category) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.category && (
                <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                  {post.category}
                </span>
              )}
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post Actions */}
        <footer className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
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
  );
};

export default PostDetail;