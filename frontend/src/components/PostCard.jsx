import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <article className="card p-6">
      {post.coverImage && (
        <div className="mb-4">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="flex items-center space-x-2 mb-3">
        <img
          src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.username}&background=0ea5e9&color=fff`}
          alt={post.author.username}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm text-gray-600">{post.author.username}</span>
        <span className="text-gray-300">•</span>
        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
        <Link to={`/post/${post._id}`}>
          {post.title}
        </Link>
      </h2>

      <div 
        className="text-gray-600 mb-4 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: truncateContent(post.content) }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{post.likesCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.commentsCount}</span>
          </div>
        </div>
        <Link
          to={`/post/${post._id}`}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;