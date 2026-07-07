// app/components/layout/LogoutButton.tsx
'use client';

import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => void;
  variant?: 'default' | 'icon' | 'full';
  className?: string;
}

export default function LogoutButton({ 
  onLogout, 
  variant = 'default',
  className = '' 
}: LogoutButtonProps) {
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };
  
  if (variant === 'icon') {
    return (
      <button
        onClick={handleLogout}
        className={`p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 ${className}`}
        title="Logout"
      >
        <LogOut className="h-5 w-5" />
      </button>
    );
  }
  
  if (variant === 'full') {
    return (
      <button
        onClick={handleLogout}
        className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${className}`}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </button>
    );
  }
  
  // Default variant
  return (
    <button
      onClick={handleLogout}
      className={`inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </button>
  );
}