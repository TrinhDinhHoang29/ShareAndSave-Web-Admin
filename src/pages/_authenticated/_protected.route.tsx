// import { useAuth } from "@/context/auth-context";
import { useAuth } from "@/context/auth-context";
import { useChatNotificationSocket } from "@/hooks/sockets/use-chat-noti-socket";
import { useNotificationSocket } from "@/hooks/sockets/use-notifation-socket";
import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  useChatNotificationSocket();
  useNotificationSocket();
  return <>{children}</>;
};
