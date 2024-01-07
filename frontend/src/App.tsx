import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// context
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostsContext";
import { VideoHeightProvider } from "./context/VideoHeightContext";
import { CategoryProvider } from "./context/CategoriesContext";
// pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPosts from "./pages/MyPosts";
import NewPost from "./pages/NewPost";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import CategoryPosts from "./pages/CategoryPosts";
import ProtectedRoute from "./ProtectedRoute";
import { LoaderProvider } from "./context/LoaderContext";
// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <LoaderProvider>
      <CategoryProvider>
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

                    <Route
                      path="/:category_id/:category"
                      element={<CategoryPosts />}
                    />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/mis-posts" element={<MyPosts />} />
                      <Route path="/mis-posts/:id" element={<NewPost />} />
                      <Route path="/agregar-post" element={<NewPost />} />
                      <Route path="/perfil" element={<ProfilePage />} />
                    </Route>
                  </Routes>
                </main>
                <Footer />
              </BrowserRouter>
            </PostProvider>
          </AuthProvider>
        </VideoHeightProvider>
      </CategoryProvider>
    </LoaderProvider>
  );
}

export default App;
