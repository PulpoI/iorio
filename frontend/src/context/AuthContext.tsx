import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  updateToken,
} from "../services/auth";
import { AuthContextValue } from "./types";
import Cookies from "js-cookie";
import { useLoader } from "./LoaderContext";
// import { set } from "react-hook-form";

export const AuthContext = createContext<AuthContextValue>({
  signup: async () => {},
  signin: async () => {},
  logout: () => {},
  user: null,
  isAuthenticated: false,
  errors: [],
  loading: true,
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
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoading, showLoader, hideLoader } = useLoader();

  const signup = async (user: object) => {
    try {
      const res = await registerRequest(user);
      if (res.status !== "error") {
        setUser(res.result);
        setIsAuthenticated(true);
        Cookies.set("user", res.result.token, { expires: 365 });
      } else {
        setErrors(res.result.error_msg);
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
        hideLoader();
        setUser(res.result);
        setIsAuthenticated(true);
        Cookies.set("user", res.result.token, { expires: 365 });
      } else {
        hideLoader();
        setErrors(res.result.error_msg);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors(error);
    }
  };

  const logout = async () => {
    try {
      const res = await updateToken(Cookies.get("user") as string);
      Cookies.remove("user");
      setUser(null);
      setIsAuthenticated(false);
    } catch {
      Cookies.remove("user");
      setUser(null);
      setIsAuthenticated(false);
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

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.user) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.user);
        if (res === 0) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        } else {
          setUser(res);
          setIsAuthenticated(true);
          setLoading(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  const contextValue: AuthContextValue = {
    signup,
    signin,
    logout,
    loading,
    user,
    isAuthenticated,
    errors,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
