import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import People from "./pages/People";
import Research from "./pages/Research";
import Projects from "./pages/Projects";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminPages from "./pages/admin/AdminPages";
import AdminMenus from "./pages/admin/AdminMenus";

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
      
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="pages" element={<AdminPages />} />
        <Route path="menus" element={<AdminMenus />} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
