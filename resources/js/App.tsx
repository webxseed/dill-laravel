import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import People from "./pages/People";
import Research from "./pages/Research";
import Projects from "./pages/Projects";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminPages from "./pages/admin/AdminPages";
import AdminMenus from "./pages/admin/AdminMenus";
import AdminNews from "./pages/admin/AdminNews";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminPeople from "./pages/admin/AdminPeople";
import AdminFacilities from "./pages/admin/AdminFacilities";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminPublications from "./pages/admin/AdminPublications";
import AdminSiteConfig from "./pages/admin/AdminSiteConfig";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContactSubmissions from "./pages/admin/AdminContactSubmissions";
import { api } from "./lib/api";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setAuthorized(api.isLoggedIn());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoutes() {
  const handleLogout = async () => {
    await api.logout();
    window.location.href = "/login";
  };

  return (
    <AdminLayout onLogout={handleLogout}>
      <Routes>
        <Route path="pages" element={<AdminPages />} />
        <Route path="menus" element={<AdminMenus />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="people" element={<AdminPeople />} />
        <Route path="facilities" element={<AdminFacilities />} />
        <Route path="publications" element={<AdminPublications />} />
        <Route path="site-config" element={<AdminSiteConfig />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="contact" element={<AdminContactSubmissions />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin/pages" replace />} />
      </Routes>
    </AdminLayout>
  );
}

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public site routes with SiteLayout */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/people" element={<People />} />
        <Route path="/research" element={<Research />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      
      {/* Login */}
      <Route path="/login" element={<Login />} />
      
      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
