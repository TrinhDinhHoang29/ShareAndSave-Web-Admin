import {
  IconLayoutDashboard,
  IconPackage,
  IconPackageExport,
  IconPackageImport,
  IconPencil,
  IconSettings,
  IconTag,
  IconUserCog,
  IconUsers,
} from "@tabler/icons-react";
import {
  AlarmClock,
  AlignJustify,
  ArrowLeftRightIcon,
  Command,
  HeartIcon,
  WarehouseIcon,
} from "lucide-react";
import { type SidebarData } from "../types";

export const sidebarData = (quantity: number): SidebarData => {
  return {
    user: {
      name: "satnaing",
      email: "satnaingdev@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "SAS",
        logo: Command,
        plan: "Trang quản trị",
      },
    ],
    navGroups: [
      {
        title: "Tổng quan",
        items: [
          {
            title: "Bảng điều khiển",
            url: "/",
            icon: IconLayoutDashboard,
          },

          {
            title: "Quan tâm",
            url: "/interests",
            icon: HeartIcon,
            badge: `${quantity}`,
          },
          {
            title: "Cuộc hẹn",
            url: "/appointments",
            icon: AlarmClock,
          },
          {
            title: "Người dùng",
            url: "/users",
            icon: IconUsers,
          },
          {
            title: "Bài viết",
            icon: IconPencil,
            items: [
              {
                title: "Quản trị",
                url: "/posts/admin",
              },
              {
                title: "Người dùng",
                url: "/posts/client",
              },
            ],
          },
          {
            title: "Đồ đạc",
            url: "/items",
            icon: IconTag,
          },
          {
            title: "Loại món đồ",
            url: "/categories",
            icon: AlignJustify,
          },
          {
            title: "Hàng tồn",
            url: "/inventories",
            icon: WarehouseIcon,
          },
          {
            title: "Giao dịch",
            url: "/transactions",
            icon: ArrowLeftRightIcon,
          },
          {
            title: "Lô hàng",
            url: "/warehouses",
            icon: IconPackage,
          },
          {
            title: "Phiếu nhập",
            url: "/import-invoices",
            icon: IconPackageImport,
          },
          {
            title: "Phiếu xuất",
            url: "/export-invoices",
            icon: IconPackageExport,
          },
        ],
      },
      // {
      //   title: "Pages",
      //   items: [
      //     {
      //       title: "Auth",
      //       icon: IconLockAccess,
      //       items: [
      //         {
      //           title: "Sign In",
      //           url: "/sign-in",
      //         },
      //         {
      //           title: "Sign In (2 Col)",
      //           url: "/sign-in-2",
      //         },
      //         {
      //           title: "Sign Up",
      //           url: "/sign-up",
      //         },
      //         {
      //           title: "Forgot Password",
      //           url: "/forgot-password",
      //         },
      //         {
      //           title: "OTP",
      //           url: "/otp",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Errors",
      //       icon: IconBug,
      //       items: [
      //         {
      //           title: "Unauthorized",
      //           url: "/401",
      //           icon: IconLock,
      //         },
      //         {
      //           title: "Forbidden",
      //           url: "/403",
      //           icon: IconUserOff,
      //         },
      //         {
      //           title: "Not Found",
      //           url: "/404",
      //           icon: IconError404,
      //         },
      //         {
      //           title: "Internal Server Error",
      //           url: "/500",
      //           icon: IconServerOff,
      //         },
      //         {
      //           title: "Maintenance Error",
      //           url: "/503",
      //           icon: IconBarrierBlock,
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        title: "Khác",
        items: [
          {
            title: "Cài đặt",
            icon: IconSettings,
            items: [
              {
                title: "Giao diện người dùng",
                url: "/settings",
                icon: IconUserCog,
              },
              // {
              //   title: "Account",
              //   url: "/settings/account",
              //   icon: IconTool,
              // },
              // {
              //   title: "Appearance",
              //   url: "/settings/appearance",
              //   icon: IconPalette,
              // },
              // {
              //   title: "Notifications",
              //   url: "/settings/notifications",
              //   icon: IconNotification,
              // },
              // {
              //   title: "Display",
              //   url: "/settings/display",
              //   icon: IconBrowserCheck,
              // },
            ],
          },
        ],
      },
    ],
  };
};
