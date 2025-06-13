import LayoutDefault from "@/components/layout";
import LoadingSpinner from "@/components/ui/loading-spinner";
import LoginPage from "@/pages/(auth)/login";
import { ProtectedRoute } from "@/pages/_authenticated/_protected.route";
import Chats from "@/pages/_authenticated/chats";
import CreateExportInvoicePage from "@/pages/_authenticated/export-invoices/create";
import ListImportInvoice from "@/pages/_authenticated/import-invoices";
import CreateImportInvoicePage from "@/pages/_authenticated/import-invoices/create-import-invoice";
import ListInventoriesPage from "@/pages/_authenticated/inventory";
import ListItemPage from "@/pages/_authenticated/items";
import ListPostPage from "@/pages/_authenticated/posts";
import CreatePostPage from "@/pages/_authenticated/posts/create";
import UsersPage from "@/pages/_authenticated/users";
import ListWarehousesPage from "@/pages/_authenticated/warehouses";
import WarehouseDetailPage from "@/pages/_authenticated/warehouses/[id]/detail";
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
    path: "/login",
    element: (
      <ErrorBoundary>
        <LoginPage />
      </ErrorBoundary>
    ),
  },
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
        path: "dashboard",
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
        path: "/import-invoices",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <ListImportInvoice />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/import-invoices/create",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <CreateImportInvoicePage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/export-invoices/create",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <CreateExportInvoicePage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/inventories",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <ListInventoriesPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/warehouses",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <ListWarehousesPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/warehouses/:id",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <WarehouseDetailPage />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/items",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <ListItemPage />
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
