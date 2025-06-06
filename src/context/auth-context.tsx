import { getMe, logout } from "@/apis/auth.api";
import { useGetMe } from "@/hooks/react-query-hooks/use-auth";
import {
  clearAccessToken,
  clearRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/token";
import { ILogin } from "@/types/login.type";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export interface IAuthUserInfo {
  address: string;
  avatar: string;
  email: string;
  fullName: string;
  goodPoint: number;
  id: number;
  major: string;
  permissions: { code: string }[];
  phoneNumber: string;
  roleID: number;
  roleName: string;
  status: number;
}
interface AuthContextType {
  user: IAuthUserInfo | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  loginAction: (res: ILogin) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loginAction: () => {},
  isAuthLoading: true,
  logOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState<IAuthUserInfo | null>(null);
  const navigate = useNavigate();

  const { data, error } = useGetMe({ enabled: !!getRefreshToken() });

  useEffect(() => {
    const init = async () => {
      if (!getRefreshToken()) {
        setIsAuthLoading(false);
        navigate("/login");
        return;
      }

      if (error) {
        logOut();
        return;
      }

      if (data) {
        setUser(data.user);
        setIsAuthenticated(!!getAccessToken());
        setIsAuthLoading(false);
      }
    };
    init();
  }, [data, error]);

  const logOut = async () => {
    clearAccessToken();
    clearRefreshToken();
    await logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const loginAction = async (res: ILogin) => {
    setAccessToken(res.jwt);
    setRefreshToken(res.refreshToken);

    try {
      const response = await getMe();
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      logOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthLoading, loginAction, user, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth has to be used within <AuthContext.Provider>");
  }

  return authContext;
};
