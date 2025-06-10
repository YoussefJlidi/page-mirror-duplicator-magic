
import React, { useState } from 'react';
import { Plus, Menu, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AgentChatModal from '@/components/AgentChatModal';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNewAgent: () => void;
  onNewCampaign?: () => void;
  currentView: string;
  agents?: Array<{ id: number; name: string; }>;
  campaigns?: Array<{ id: number; name: string; }>;
}

const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar, 
  onNewAgent, 
  onNewCampaign, 
  currentView,
  agents = [],
  campaigns = []
}) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const getTitle = () => {
    switch (currentView) {
      case 'call':
        return 'Campagnes';
      case 'integrations':
        return 'Intégrations';
      case 'instructions':
        return 'Instructions';
      case 'human':
        return 'Appels Humain';
      case 'agents':
      default:
        return 'Agents';
    }
  };

  const getButtonText = () => {
    switch (currentView) {
      case 'call':
        return 'Créer une campagne';
      case 'agents':
      default:
        return 'New agent';
    }
  };

  const handleButtonClick = () => {
    if (currentView === 'call' && onNewCampaign) {
      onNewCampaign();
    } else {
      onNewAgent();
    }
  };

  const handleChatModalOpen = () => {
    setIsChatModalOpen(true);
  };

  const handleChatModalClose = () => {
    setIsChatModalOpen(false);
  };

  return (
    <>
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
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleChatModalOpen}
              className="bg-black text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuter avec un agent</span>
            </Button>
            
            {(currentView === 'agents' || currentView === 'call') && (
              <Button 
                onClick={handleButtonClick}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>{getButtonText()}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <AgentChatModal
        isOpen={isChatModalOpen}
        onClose={handleChatModalClose}
        agents={agents}
        campaigns={campaigns}
      />
    </>
  );
};

export default Header;
