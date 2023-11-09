import { createContext, useContext, ReactNode, useState } from "react";
import { PostContextValue } from "./types";
import { createtPostsRequest, getPostsUserRequest } from "../services/posts";
import { useAuth } from "./AuthContext";

const PostContext = createContext<PostContextValue>({
  posts: [],
  createPost: async () => {},
  getPostsUser: async () => {},
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

  const contextValue: PostContextValue = {
    posts,
    createPost,
    getPostsUser,
  };
  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
};
