
import React from 'react';
import { Plus, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNewAgent: () => void;
  onNewCampaign?: () => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onNewAgent, onNewCampaign, currentView }) => {
  const getTitle = () => {
    switch (currentView) {
      case 'call':
        return 'Campagnes';
      case 'agents':
      default:
        return 'Agents';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{getTitle()}</h1>
        </div>
        
        {currentView === 'agents' && (
          <button 
            onClick={onNewAgent}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New agent</span>
          </button>
        )}

        {currentView === 'call' && onNewCampaign && (
          <button 
            onClick={onNewCampaign}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Créer une campagne</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
