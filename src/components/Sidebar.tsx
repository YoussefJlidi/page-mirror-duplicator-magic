
import React from 'react';
import { Bot, PhoneOutgoing, Puzzle, LayoutDashboard, BookOpen, CreditCard, Zap, PhoneIncoming } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
}

const sidebarItems = [
  { icon: Bot, label: 'Agents', isActive: true },
  { icon: PhoneOutgoing, label: 'Passer un appel' },
  { icon: PhoneIncoming, label: 'Recevoir un appel' },
  { icon: Puzzle, label: 'Integrations' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: BookOpen, label: 'Instructions' },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-lg text-gray-900">Rounded</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  item.isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Balance Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-3">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <CreditCard className="w-4 h-4" />
              {!isCollapsed && <span>Balance</span>}
            </div>
            {!isCollapsed && (
              <p className="text-xs text-gray-500">Credits left: 8,45 €</p>
            )}
          </div>
          
          <button className={cn(
            "flex items-center space-x-2 bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors w-full justify-center",
            isCollapsed && "px-2"
          )}>
            <Zap className="w-4 h-4" />
            {!isCollapsed && <span>Recharge</span>}
          </button>
        </div>

        {/* User info */}
        <div className="mt-4 flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">Y</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Youssef Jlidi</p>
              <p className="text-xs text-gray-500 truncate">jlidi.youssef@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
