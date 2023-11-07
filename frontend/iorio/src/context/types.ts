export interface AuthContextValue {
  signup: (user: object) => Promise<void>;
  signin: (user: object) => Promise<void>;
  user: object | null;
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
}
