import React, { useState } from 'react';
import { Bot, PhoneOutgoing, Puzzle, LayoutDashboard, BookOpen, CreditCard, Zap, PhoneIncoming, LogOut, Settings, User, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import RechargeModal from './RechargeModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarProps {
  isCollapsed: boolean;
  onViewChange?: (view: string) => void;
  currentView?: string;
}

const sidebarItems = [
  { icon: Bot, label: 'Agents', view: 'agents', route: '/' },
  { icon: PhoneOutgoing, label: 'Passer un appel', view: 'call', route: '/' },
  { icon: PhoneIncoming, label: 'Recevoir un appel', view: 'receive', route: '/inbound-calls' },
  { icon: Puzzle, label: 'Integrations', view: 'integrations', route: '/integrations' },
  { icon: BookOpen, label: 'Instructions', view: 'instructions', route: '/instructions' },
  { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard', route: '/' },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onViewChange, currentView = 'agents' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  const handleItemClick = (view: string, route: string) => {
    console.log(`Navigation vers: ${view} - ${route}`);
    
    // Si on va vers une route différente, naviguer d'abord
    if (route !== location.pathname) {
      navigate(route);
    }
    
    // Si on est sur la page d'accueil (ou qu'on y va) et qu'on a un callback pour changer la vue
    if (route === '/' && onViewChange) {
      // Utiliser setTimeout pour s'assurer que la navigation est terminée
      setTimeout(() => {
        onViewChange(view);
      }, 0);
    }
  };

  // Déterminer la vue active basée sur l'URL actuelle
  const getActiveView = () => {
    if (location.pathname === '/inbound-calls') return 'receive';
    if (location.pathname === '/integrations') return 'integrations';
    if (location.pathname === '/instructions') return 'instructions';
    // Pour la page d'accueil, utiliser la vue actuelle passée en props
    if (location.pathname === '/') return currentView || 'agents';
    return 'agents';
  };

  const activeView = getActiveView();

  const handleRecharge = () => {
    console.log('Ouverture de la modal de recharge');
    setIsRechargeModalOpen(true);
  };

  const handleLogout = () => {
    console.log('Déconnexion');
    // Logique de déconnexion ici
  };

  const handleProfile = () => {
    console.log('Profil utilisateur');
    // Navigation vers le profil
  };

  const handleSettings = () => {
    console.log('Paramètres');
    // Navigation vers les paramètres
  };

  return (
    <>
      <div className={cn(
        "bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-lg text-gray-900">Voxama</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleItemClick(item.view, item.route)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left hover:bg-gray-50 active:bg-gray-100",
                    activeView === item.view
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
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
            
            <button 
              onClick={handleRecharge}
              className={cn(
                "flex items-center space-x-2 bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 active:bg-gray-900 transition-colors w-full justify-center",
                isCollapsed && "px-2"
              )}
            >
              <Zap className="w-4 h-4" />
              {!isCollapsed && <span>Recharge</span>}
            </button>
          </div>

          {/* User Dropdown Section */}
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Y</span>
                  </div>
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-gray-900 truncate">Youssef Jlidi</p>
                        <p className="text-xs text-gray-500 truncate">jlidi.youssef@gmail.com</p>
                      </div>
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    </>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mb-2">
                <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <RechargeModal 
        isOpen={isRechargeModalOpen} 
        onClose={() => setIsRechargeModalOpen(false)} 
      />
    </>
  );
};

export default Sidebar;
