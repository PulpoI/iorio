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
import { VideoHeightProvider } from "./context/VideoHeightContext";

function App() {
  return (
    <VideoHeightProvider>
      <AuthProvider>
        <PostProvider>
          <BrowserRouter>
            <Navbar />
            <main className="">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/mis-posts" element={<MyPosts />} />
                  <Route path="/mis-posts/:id" element={<NewPost />} />
                  <Route path="/agregar-post" element={<NewPost />} />
                  <Route path="/perfil" element={<ProfilePage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </PostProvider>
      </AuthProvider>
    </VideoHeightProvider>
  );
}

export default App;
