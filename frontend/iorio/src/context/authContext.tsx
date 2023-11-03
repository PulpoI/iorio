import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { registerRequest, loginRequest } from "../services/auth";
import { AuthContextValue } from "./types";

export const AuthContext = createContext<AuthContextValue>({
  signup: async () => {},
  signin: async () => {},
  user: null,
  isAuthenticated: false,
  errors: [],
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<object | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const signup = async (user: object) => {
    try {
      const data = await registerRequest(user);
      if (data.status !== "error") {
        setUser(data.result);
        setIsAuthenticated(true);
      } else {
        setErrors(data.result.error_msg);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors(error);
    }
  };

  const signin = async (user: object) => {
    try {
      const res = await loginRequest(user);
      if (res.status !== "error") {
        setUser(res.result);
        setIsAuthenticated(true);
      } else {
        setErrors(res.result.error_msg);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors(error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const contextValue: AuthContextValue = {
    signup,
    signin,
    user,
    isAuthenticated,
    errors,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
