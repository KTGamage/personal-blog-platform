import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI, postsAPI } from '../services/api';
import PostCard from '../components/PostCard';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    bio: '',
    avatar: ''
  });

  const { user: currentUser } = useAuth();
  const { id } = useParams();

  const isOwnProfile = currentUser && currentUser._id === id;

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getUser(id);
      setProfile(response.data.user);
      setPosts(response.data.posts);
      setEditForm({
        username: response.data.user.username,
        bio: response.data.user.bio || '',
        avatar: response.data.user.avatar || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await usersAPI.updateProfile(editForm);
      setProfile(response.data);
      setEditing(false);
      // Update current user in context if it's the current user's profile
      if (isOwnProfile && currentUser.updateProfile) {
        currentUser.updateProfile(response.data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h2>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.username}&background=0ea5e9&color=fff&size=128`}
              alt={profile.username}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            {editing ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditChange}
                    rows="3"
                    className="input-field"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    id="avatar"
                    name="avatar"
                    value={editForm.avatar}
                    onChange={handleEditChange}
                    className="input-field"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.username}</h1>
                  {isOwnProfile && (
                    <button
                      onClick={() => setEditing(true)}
                      className="btn-secondary"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {profile.bio && (
                  <p className="text-gray-600 text-lg mb-4">{profile.bio}</p>
                )}

                <div className="text-sm text-gray-500">
                  <p>Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isOwnProfile ? 'Your Posts' : `${profile.username}'s Posts`}
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-4">
              {isOwnProfile ? 'Start sharing your thoughts with the community!' : 'This user hasn\'t published any posts yet.'}
            </p>
            {isOwnProfile && (
              <Link to="/create-post" className="btn-primary">
                Write Your First Post
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;