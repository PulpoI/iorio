export interface AuthContextValue {
  signup: (user: object) => Promise<void>;
  signin: (user: object) => Promise<void>;
  logout: () => Promise<void>;
  user: object | null;
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
}

export interface PostContextValue {
  posts: object[];
  createPost: (post: object) => Promise<void>;
  getPostsUser: () => Promise<void>;
  getPosts: () => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}