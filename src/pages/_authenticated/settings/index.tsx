import { Button } from "@/components/ui/button";
import {
  Bell,
  Camera,
  ChevronRight,
  Eye,
  EyeOff,
  Globe,
  HelpCircle,
  Image as ImageIcon,
  Link,
  Lock,
  Mail,
  Palette,
  Phone,
  Save,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, _setDarkMode] = useState(false);
  // const [notifications, setNotifications] = useState({
  //   email: true,
  //   push: false,
  //   sms: true,
  // });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    bannerLogo: null,
  });
  const [footerLinks, setFooterLinks] = useState([
    { id: 1, label: "About Us", url: "https://example.com/about" },
    { id: 2, label: "Contact", url: "https://example.com/contact" },
  ]);

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBannerUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev: any) => ({
        ...prev,
        bannerLogo: URL.createObjectURL(file),
      }));
    }
  };

  const handleFooterLinkChange = (id: any, field: any, value: any) => {
    setFooterLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const addFooterLink = () => {
    setFooterLinks((prev) => [
      ...prev,
      { id: prev.length + 1, label: "", url: "" },
    ]);
  };

  const removeFooterLink = (id: any) => {
    setFooterLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language", icon: Globe },
    { id: "system", label: "System", icon: Settings }, // New System tab
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-background" : "bg-background"
      }`}
    >
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div
          className={`mb-8 ${darkMode ? "text-foreground" : "text-foreground"}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Cài đặt</h1>
          </div>
          <p className={`text-muted-foreground`}>
            Quản lí thông tin tải khoản và hệ thống
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div
            className={`lg:w-80 ${
              darkMode ? "bg-card" : "bg-card"
            } rounded-xl shadow-lg p-6`}
          >
            <nav className="space-y-2">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : darkMode
                        ? "text-sidebar-foreground hover:bg-sidebar-accent"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div
              className={`${
                darkMode ? "bg-card" : "bg-card"
              } rounded-xl shadow-lg p-8`}
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    Profile Settings
                  </h2>
                  {/* ... (Existing Profile Tab content unchanged) ... */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        JD
                      </div>
                      <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Profile Photo
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Upload a new profile picture
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  </div>

                  <Button>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    Notification Preferences
                  </h2>
                  {/* ... (Existing Notifications Tab content unchanged) ... */}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    Security Settings
                  </h2>
                  {/* ... (Existing Security Tab content unchanged) ... */}
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) =>
                            handleInputChange("currentPassword", e.target.value)
                          }
                          className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) =>
                            handleInputChange("newPassword", e.target.value)
                          }
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mb-2`}
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    Appearance Settings
                  </h2>
                  {/* ... (Existing Appearance Tab content unchanged) ... */}
                </div>
              )}

              {/* Language Tab */}
              {activeTab === "language" && (
                <div className="space-y-6">
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    Language & Region
                  </h2>
                  {/* ... (Existing Language Tab content unchanged) ... */}
                </div>
              )}

              {/* System Tab */}
              {activeTab === "system" && (
                <div className="space-y-6">
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    System Settings
                  </h2>

                  {/* Banner Logo Section */}
                  <div className="space-y-4">
                    <h3
                      className={`font-medium ${
                        darkMode ? "text-foreground" : "text-foreground"
                      }`}
                    >
                      Banner Logo
                    </h3>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        {formData.bannerLogo ? (
                          <img
                            src={formData.bannerLogo}
                            alt="Banner Logo"
                            className="w-48 h-12 object-contain rounded-lg border border-border"
                          />
                        ) : (
                          <div
                            className={`w-48 h-12 rounded-lg border border-border flex items-center justify-center ${
                              darkMode ? "bg-muted" : "bg-muted"
                            }`}
                          >
                            <ImageIcon className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                        <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors cursor-pointer">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkMode
                              ? "text-muted-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          Upload a banner logo (recommended size: 1920x120px)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Links Section */}
                  <div className="space-y-4">
                    <h3
                      className={`font-medium ${
                        darkMode ? "text-foreground" : "text-foreground"
                      }`}
                    >
                      Footer Links
                    </h3>
                    {footerLinks.map((link) => (
                      <div
                        key={link.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border ${
                          darkMode
                            ? "border-border bg-muted"
                            : "border-border bg-muted"
                        }`}
                      >
                        <div className="flex-1">
                          <label
                            className={`block text-sm font-medium ${
                              darkMode
                                ? "text-muted-foreground"
                                : "text-muted-foreground"
                            } mb-2`}
                          >
                            Link Label
                          </label>
                          <div className="relative">
                            <Link
                              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                darkMode
                                  ? "text-muted-foreground"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) =>
                                handleFooterLinkChange(
                                  link.id,
                                  "label",
                                  e.target.value
                                )
                              }
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                darkMode
                                  ? "bg-card border-border text-foreground"
                                  : "bg-card border-border text-foreground"
                              } focus:ring-2 focus:ring-primary focus:border-transparent`}
                              placeholder="Link Label"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label
                            className={`block text-sm font-medium ${
                              darkMode
                                ? "text-muted-foreground"
                                : "text-muted-foreground"
                            } mb-2`}
                          >
                            Link URL
                          </label>
                          <div className="relative">
                            <Link
                              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                darkMode
                                  ? "text-muted-foreground"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) =>
                                handleFooterLinkChange(
                                  link.id,
                                  "url",
                                  e.target.value
                                )
                              }
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                darkMode
                                  ? "bg-card border-border text-foreground"
                                  : "bg-card border-border text-foreground"
                              } focus:ring-2 focus:ring-primary focus:border-transparent`}
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeFooterLink(link.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addFooterLink}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Link className="w-4 h-4" />
                      Add Link
                    </button>
                  </div>

                  <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    <Save className="w-4 h-4" />
                    Save System Changes
                  </button>
                </div>
              )}

              {/* Help Tab */}
              {activeTab === "help" && (
                <div className="space-y-6">
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    Help & Support
                  </h2>
                  {/* ... (Existing Help Tab content unchanged) ... */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
