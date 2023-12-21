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
  getPost: (id: string) => Promise<void>;
  getPostsCategory: (category: string) => Promise<void>;
}


export interface VideoHeightContextValue {
  videoHeight: number;
  setVideoHeight: (height: number) => void;
}

export interface CategoryContextValue {
  categories: object[];
  getCategories: () => Promise<void>;
}

