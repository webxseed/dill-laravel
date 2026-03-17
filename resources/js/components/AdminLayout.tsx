import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export default function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: "/admin/pages", label: "Pages" },
    { path: "/admin/menus", label: "Menus" },
    { path: "/admin/news", label: "News" },
    { path: "/admin/projects", label: "Projects" },
    { path: "/admin/people", label: "People" },
    { path: "/admin/facilities", label: "Facilities" },
    { path: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-lg">DIIL Admin</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">View Site</Link>
            {onLogout && (
              <button onClick={onLogout} className="text-sm text-red-600 hover:text-red-700">Logout</button>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white border-r transition-all ${sidebarOpen ? 'w-48' : 'w-16'}`}>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-sm ${
                  location.pathname === item.path
                    ? "bg-accent text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
