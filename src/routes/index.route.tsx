import LayoutDefault from "@/components/layout";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { ProtectedRoute } from "@/pages/_authenticated/_protected.route";
import Chats from "@/pages/_authenticated/chats";
import ListPostPage from "@/pages/_authenticated/posts";
import CreatePostPage from "@/pages/_authenticated/posts/create";
import UsersPage from "@/pages/_authenticated/users";
import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy load các components
const Dashboard = lazy(() => import("@/pages/_authenticated/dashboard"));

// Error Boundary Component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <UsersPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <ListPostPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/posts/create",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <CreatePostPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/chats",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <Chats />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
    ],
  },
];
