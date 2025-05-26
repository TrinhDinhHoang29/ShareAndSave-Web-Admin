import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import LoadingSpinner from "@/components/ui/loading-spinner";
import LayoutDefault from "@/components/layout";
import { ProtectedRoute } from "@/pages/_authenticated/_protected.route";

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
    ],
  },
];
