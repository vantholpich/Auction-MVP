import { MoreVertical, User, Shield, Bell, HelpCircle, FileText, LogOut, Users, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface SettingsViewProps {
  onNavigate: (view: 'create-friend' | 'my-friends') => void;
  onLogout: () => void;
}

export function SettingsView({ onNavigate, onLogout }: SettingsViewProps) {
  const settingsItems = [
    { icon: User, label: 'Account Settings', color: 'bg-pink-100 text-pink-600', onClick: () => {} },
    { icon: Shield, label: 'Privacy Settings', color: 'bg-pink-100 text-pink-600', onClick: () => {} },
    { icon: Bell, label: 'Notifications', color: 'bg-pink-100 text-pink-600', onClick: () => {} },
    { icon: Users, label: 'Auction a Friend', color: 'bg-pink-100 text-pink-600', onClick: () => onNavigate('create-friend') },
    { icon: Heart, label: 'My Friends', color: 'bg-pink-100 text-pink-600', onClick: () => onNavigate('my-friends') },
  ];

  const supportItems = [
    { icon: HelpCircle, label: 'Help & Support', color: 'bg-pink-100 text-pink-600', onClick: () => {} },
    { icon: FileText, label: 'Legal & About', color: 'bg-pink-100 text-pink-600', onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between">
        <h1 className="flex-1">Profile</h1>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* User Profile Section */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Avery Montgomery"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2>Avery Montgomery</h2>
            <p className="text-gray-500">avery.m@email.com</p>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-6 py-4">
        <h3 className="mb-4">Settings</h3>
        <div className="space-y-3">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span>{item.label}</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Help & Support Section */}
      <div className="px-6 py-4">
        <h3 className="mb-4">Help & Support</h3>
        <div className="space-y-3">
          {supportItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span>{item.label}</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Log Out Button */}
      <div className="px-6 py-4">
        <Button
          onClick={onLogout}
          className="w-full h-14 bg-red-500 hover:bg-red-600 rounded-2xl"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
