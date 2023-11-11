import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostsContext";

import MyPosts from "./pages/MyPosts";
import NewPost from "./pages/NewPost";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container mx-auto px-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/mis-posts" element={<MyPosts />} />
                <Route path="/mis-posts/:id" element={<MyPosts />} />
                <Route path="/agregar-post" element={<NewPost />} />
                <Route path="/perfil" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
