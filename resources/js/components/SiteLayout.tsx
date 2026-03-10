import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.svg";
import { api, Settings } from "@/lib/api";

export default function SiteLayout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<{label: string, path: string}[]>([]);
  const [footerLinks, setFooterLinks] = useState<{label: string, path: string}[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const isHome = location.pathname === "/";
  const useLight = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Fetch menu items and settings from API
    Promise.all([
      api.getMenu('main'),
      api.getMenu('footer'),
      api.getSettings(),
    ])
      .then(([mainMenu, footerMenu, settingsData]) => {
        setNavLinks(mainMenu);
        setFooterLinks(footerMenu);
        setSettings(settingsData as Settings);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="container-wide mx-auto flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="DIIL Logo" className="h-10 md:h-12 w-auto" />
            <div className="hidden sm:block">
              <span className={`text-xs font-heading font-bold leading-tight block ${useLight ? 'text-primary-foreground' : 'text-foreground'}`}>
                Defects and Internal
              </span>
              <span className={`text-xs font-heading font-bold leading-tight block ${useLight ? 'text-primary-foreground' : 'text-foreground'}`}>
                Interfaces Lab
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-[19px] font-bold rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "text-accent"
                    : useLight
                      ? "text-primary-foreground/80 hover:text-primary-foreground"
                      : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 ${useLight ? 'text-primary-foreground' : 'text-foreground'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 text-[19px] font-bold rounded-md ${
                      location.pathname === link.path
                        ? "text-accent bg-secondary"
                        : "text-foreground/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Content */}
      <main className="flex-1"><Outlet /></main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container-wide mx-auto section-padding py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="DIIL" className="h-10 w-auto brightness-200" />
                <div>
                  <p className="font-heading font-bold">Defects and Internal Interfaces Lab</p>
                  <p className="text-xs text-primary-foreground/60">
                    Defects and Internal Interfaces Lab
                  </p>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                Studying local electrical properties across microstructural defects in
                alloys and across interfaces between metallic materials.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold mb-4 text-copper-light">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold mb-4 text-copper-light">
                Contact
              </h4>
              <div className="text-sm text-primary-foreground/70 space-y-2">
                <p>{settings?.contact_name || 'Dr. Hanna Bishara'}</p>
                <p>{settings?.location_room ? `${settings.location_building}, ${settings.location_room}` : settings?.location_building || 'Wolfson Building, Room 121'}</p>
                <p>{settings?.location_university || 'Tel Aviv University'}</p>
                <p>
                  <a href={`mailto:${settings?.contact_email || 'hbishara@tauex.tau.ac.il'}`} className="hover:text-primary-foreground transition-colors">
                    {settings?.contact_email || 'hbishara@tauex.tau.ac.il'}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-xs text-primary-foreground/40 text-center">
            © {new Date().getFullYear()} DIIL — Defects and Internal Interfaces Lab, Tel Aviv University
          </div>
        </div>
      </footer>
    </div>
  );
}
