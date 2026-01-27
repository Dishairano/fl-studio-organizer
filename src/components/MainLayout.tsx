import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Flame, Music, FolderTree, User, LogOut, Settings } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: 'kickforge' | 'melody' | 'organizer';
  onTabChange: (tab: 'kickforge' | 'melody' | 'organizer') => void;
}

export function MainLayout({ children, activeTab, onTabChange }: MainLayoutProps) {
  const user = useAuthStore((state) => state.user);
  const subscription = useAuthStore((state) => state.subscription);
  const logout = useAuthStore((state) => state.logout);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const tabs = [
    { id: 'kickforge' as const, name: 'KickForge', icon: Flame },
    { id: 'melody' as const, name: 'Melody Generator', icon: Music },
    { id: 'organizer' as const, name: 'File Organizer', icon: FolderTree },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Hardwave Studios
          </h1>
          <p className="text-xs text-gray-400 mt-1">Production Suite</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-700">
          {/* Subscription Info */}
          {subscription && (
            <div className="mb-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-xs text-cyan-400 font-semibold">
                {subscription.planName}
              </p>
              <p className="text-xs text-gray-400">
                Active until {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white truncate">
                  {user?.display_name || user?.email}
                </p>
                <p className="text-xs text-gray-500">Account</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-700 rounded-lg shadow-xl border border-gray-600 overflow-hidden">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    // Open settings
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-600 transition"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
