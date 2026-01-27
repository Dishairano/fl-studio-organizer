import { ExternalLink, CreditCard, Zap } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function SubscriptionRequired() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleGetSubscription = () => {
    const url = 'https://hardwavestudios.com/dashboard/subscription'; // Change to your actual URL
    if (window.electron) {
      window.electron.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mb-4">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Subscription Required
          </h1>
          <p className="text-gray-400 text-lg">
            Unlock access to the full Hardwave Studios suite
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 mb-6">
          <div className="mb-6">
            <p className="text-gray-300 text-center mb-4">
              Hello <span className="font-semibold text-cyan-400">{user?.email}</span>! 
              To access the Hardwave Studios Suite, you need an active subscription.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">KickForge</h3>
                <p className="text-sm text-gray-400">Professional kick designer for hardstyle & hardcore</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">Melody Generator</h3>
                <p className="text-sm text-gray-400">AI-powered melody creation with MIDI export</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">File Organizer</h3>
                <p className="text-sm text-gray-400">Intelligent sample library management</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 mb-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Starting at</p>
              <p className="text-4xl font-bold text-white mb-1">€10<span className="text-xl text-gray-400">/mo</span></p>
              <p className="text-sm text-gray-400">Cancel anytime</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleGetSubscription}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition flex items-center justify-center gap-2"
            >
              Get Subscription
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm">
          Your subscription will be managed on the Hardwave Studios website
        </p>
      </div>
    </div>
  );
}
