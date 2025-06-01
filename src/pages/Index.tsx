import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AgentTable from '@/components/AgentTable';
import CallForm from '@/components/CallForm';
import InboundCallForm from '@/components/InboundCallForm';
import Integrations from '@/pages/Integrations';
import AgentCustomizationDialog from '@/components/AgentCustomizationDialog';

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('agents');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mockAgents = [
    { id: 1, name: 'Agent Alpha', status: 'active', lastUsed: '2024-01-15' },
    { id: 2, name: 'Agent Beta', status: 'pending', lastUsed: '2024-01-14' },
    { id: 3, name: 'Agent Gamma', status: 'inactive', lastUsed: '2024-01-13' },
  ];

  const mockCampaigns = [
    { 
      id: 1, 
      name: 'Campagne Q1', 
      status: 'active' as const, 
      calls: 150, 
      successRate: 65,
      agent: 'Agent Alpha'
    },
    { 
      id: 2, 
      name: 'Campagne Prospection', 
      status: 'paused' as const, 
      calls: 89, 
      successRate: 42,
      agent: 'Agent Beta'
    },
    { 
      id: 3, 
      name: 'Campagne Follow-up', 
      status: 'completed' as const, 
      calls: 200, 
      successRate: 78,
      agent: 'Agent Gamma'
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNewAgent = () => {
    setIsDialogOpen(true);
  };

  const handleNewCampaign = () => {
    console.log('Creating new campaign...');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'call':
        return <CallForm agents={mockAgents} campaigns={mockCampaigns} />;
      case 'receive':
        return <InboundCallForm agents={mockAgents} />;
      case 'integrations':
        return <Integrations />;
      case 'agents':
      default:
        return <AgentTable agents={mockAgents} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={isCollapsed} 
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={toggleSidebar}
          onNewAgent={handleNewAgent}
          onNewCampaign={handleNewCampaign}
          currentView={currentView}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {renderCurrentView()}
        </main>
      </div>

      <AgentCustomizationDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Index;
