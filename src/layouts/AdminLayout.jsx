import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  User,
  Zap,
  Briefcase,
  FolderKanban,
  Award,
  LogOut,
  Menu,
  X,
  Home,
  ChevronLeft,
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = [
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/skills', label: 'Skills', icon: Zap },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/certifications', label: 'Certifications', icon: Award },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-300 relative">
      
      {/* Global Toast Container */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          className: 'dark:bg-[#12121a] dark:text-white dark:border dark:border-gray-800 shadow-xl font-medium',
          style: {
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }} 
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#12121a] border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 flex flex-col`}
      >
        {/* Logo & Branding Area */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Subtle bottom divider integrated via padding/border on parent, user email with truncate */}
          <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-100 dark:border-gray-800/50">
             <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0">
               <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
             </div>
             <p className="text-xs font-medium text-gray-500 dark:text-gray-400 break-all flex-1" title={user?.email}>
               {user?.email || 'admin@portfolio.com'}
             </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:translate-x-1 ${
                  isActive
                    ? 'gradient-bg text-white shadow-lg shadow-indigo-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-500 dark:hover:text-indigo-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Subtle left-accent active border indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-white/50 rounded-r-full" />
                  )}
                  <item.icon className="w-4.5 h-4.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-200 hover:translate-x-1"
          >
            <Home className="w-4.5 h-4.5 shrink-0" />
            <span className="truncate">View Portfolio</span>
          </a>
          <button
            onClick={handleSignOut}
            className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 hover:translate-x-1"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Bar - Sticky Frosted Glass */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#12121a]/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 transition-colors duration-300">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
