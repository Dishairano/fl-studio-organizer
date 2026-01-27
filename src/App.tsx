import { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { LoginPage } from './components/LoginPage';
import { SubscriptionRequired } from './components/SubscriptionRequired';
import { MainLayout } from './components/MainLayout';
import { KickForge } from './components/apps/KickForge';
import { MelodyGenerator } from './components/apps/MelodyGenerator';
import { FileOrganizer } from './components/apps/FileOrganizer';

type AppTab = 'kickforge' | 'melody' | 'organizer';

function App() {
  const { isAuthenticated, hasSubscription, verifySubscription } = useAuthStore();
  const [activeTab, setActiveTab] = useState<AppTab>('kickforge');
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (isAuthenticated) {
        await verifySubscription();
      }
      setIsVerifying(false);
    };
    verify();
  }, [isAuthenticated, verifySubscription]);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsVerifying(true)} />;
  }

  // Show loading while verifying subscription
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying subscription...</p>
        </div>
      </div>
    );
  }

  // Show subscription required page if no active subscription
  if (!hasSubscription) {
    return <SubscriptionRequired />;
  }

  // Render active app
  const renderApp = () => {
    switch (activeTab) {
      case 'kickforge':
        return <KickForge />;
      case 'melody':
        return <MelodyGenerator />;
      case 'organizer':
        return <FileOrganizer />;
      default:
        return <KickForge />;
    }
  };

  return (
    <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderApp()}
    </MainLayout>
  );
}

export default App;
