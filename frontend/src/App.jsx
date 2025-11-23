// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Header from './components/Header';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import CreatePost from './pages/CreatePost';
// import EditPost from './pages/EditPost';
// import PostDetail from './pages/PostDetail';
// import Profile from './pages/Profile';
// import AuthSuccess from './pages/AuthSuccess';
// import ProtectedRoute from './components/ProtectedRoute';
// import Contact from './pages/Contact';
// import ThreeBackground from './components/ThreeBackground';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         {/* Remove bg-gray-50 and add relative positioning */}
//         <div className="min-h-screen relative">
//           {/* Add ThreeBackground here - it will be on all pages */}
//           <ThreeBackground />
          
//           {/* Content wrapper with higher z-index */}
//           <div className="relative z-10">
//             <Header />
//             <main className="container mx-auto px-4 py-8">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/auth/success" element={<AuthSuccess />} />
//                 <Route path="/post/:id" element={<PostDetail />} />
//                 <Route path="/profile/:id" element={<Profile />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route 
//                   path="/create-post" 
//                   element={
//                     <ProtectedRoute>
//                       <CreatePost />
//                     </ProtectedRoute>
//                   } 
//                 />
//                 <Route 
//                   path="/edit-post/:id" 
//                   element={
//                     <ProtectedRoute>
//                       <EditPost />
//                     </ProtectedRoute>
//                   } 
//                 />
//               </Routes>
//             </main>
//           </div>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import AuthSuccess from './pages/AuthSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './pages/Contact';
import ThreeBackground from './components/ThreeBackground';

function App() {
  return (
    <ThemeProvider> {/* Wrap with ThemeProvider */}
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200"> {/* Add dark mode background */}
            <ThreeBackground />
            <div className="relative z-10">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/auth/success" element={<AuthSuccess />} />
                  <Route path="/post/:id" element={<PostDetail />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route 
                    path="/create-post" 
                    element={
                      <ProtectedRoute>
                        <CreatePost />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/edit-post/:id" 
                    element={
                      <ProtectedRoute>
                        <EditPost />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;