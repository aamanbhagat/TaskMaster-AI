import React from 'react';
import { User, Bell, Lock, Palette } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Switch } from '@progress/kendo-react-inputs';
import { useTheme } from '../context/ThemeContext';

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('profile');
  const [notifications, setNotifications] = React.useState(true);
  const [marketingEmails, setMarketingEmails] = React.useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const settingsSections = [
    {
      id: 'profile',
      icon: <User className="w-5 h-5" />,
      title: 'Profile',
      description: 'Update your personal information',
    },
    {
      id: 'notifications',
      icon: <Bell className="w-5 h-5" />,
      title: 'Notifications',
      description: 'Choose what updates you receive',
    },
    {
      id: 'security',
      icon: <Lock className="w-5 h-5" />,
      title: 'Security',
      description: 'Manage your security preferences',
    },
    {
      id: 'appearance',
      icon: <Palette className="w-5 h-5" />,
      title: 'Appearance',
      description: 'Customize the interface',
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <Button look="outline">Change Photo</Button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <Input defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <Input defaultValue="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input defaultValue="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <Input defaultValue="San Francisco, CA" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <Input multiline={true} rows={4} defaultValue="I'm a software developer passionate about creating beautiful and functional applications." />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Task Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a task is updated or completed</p>
                  </div>
                  <Switch checked={notifications} onChange={() => setNotifications(!notifications)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Project Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about project progress</p>
                  </div>
                  <Switch checked={notifications} onChange={() => setNotifications(!notifications)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Marketing Emails</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about new features and updates</p>
                  </div>
                  <Switch checked={marketingEmails} onChange={() => setMarketingEmails(!marketingEmails)} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <Input type="password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <Input type="password" />
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Enable 2FA</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Active Sessions</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Currently logged in on 2 devices</p>
                  </div>
                  <Button look="outline">Manage</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
                <Switch checked={darkMode} onChange={toggleDarkMode} />
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Layout</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className={`p-4 border-2 rounded-lg text-center ${darkMode ? 'border-primary-500 dark:border-primary-400' : 'border-gray-200 dark:border-gray-700'}`}>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Compact</p>
                </button>
                <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center">
                  <p className="font-medium text-gray-700 dark:text-gray-300">Default</p>
                </button>
                <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center">
                  <p className="font-medium text-gray-700 dark:text-gray-300">Comfortable</p>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Settings Navigation */}
        <div className="col-span-12 lg:col-span-3">
          <nav className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${activeSection === section.id
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
              >
                {section.icon}
                <div className="ml-3 text-left">
                  <p className="font-medium">{section.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{section.description}</p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="col-span-12 lg:col-span-9">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {renderContent()}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <Button look="outline">Cancel</Button>
              <Button themeColor="primary">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};