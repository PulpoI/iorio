import { createContext, useContext, ReactNode, useState } from "react";
import { PostContextValue } from "./types";
import {
  createtPostsRequest,
  deletePostsRequest,
  getPostsUserRequest,
} from "../services/posts";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";

const PostContext = createContext<PostContextValue>({
  posts: [],
  createPost: async () => {},
  getPostsUser: async () => {},
  deletePost: async () => {},
});

export const usePosts = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const PostProvider = ({ children }: AuthProviderProps) => {
  const [posts, setPosts] = useState<object[]>([]);
  const { user } = useAuth();

  const createPost = async (post: object) => {
    await createtPostsRequest(post);
  };

  const getPostsUser = async () => {
    try {
      if (!user || !("id" in user)) {
        throw new Error("User is not authenticated");
      }
      const res = await getPostsUserRequest(user.id);
      setPosts(res || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const token = await Cookies.get("user");
      const res = await deletePostsRequest(id, user.id, token);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue: PostContextValue = {
    posts,
    createPost,
    getPostsUser,
    deletePost,
  };
  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
};
