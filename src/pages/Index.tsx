import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AgentTable from '@/components/AgentTable';
import AgentCustomizationDialog from '@/components/AgentCustomizationDialog';
import CampaignCreationDialog from '@/components/CampaignCreationDialog';
import CampaignCard from '@/components/CampaignCard';
import Dashboard from '@/components/Dashboard';
import { useToast } from '@/hooks/use-toast';

const initialAgents = [
  {
    id: 1,
    name: 'Restaurant Order Taking',
    calls: 0,
    timeInCall: '0s in call',
    status: 'pending' as const
  },
  {
    id: 2,
    name: 'Restaurant Order Taking',
    calls: 0,
    timeInCall: '0s in call',
    status: 'inactive' as const
  },
  {
    id: 3,
    name: 'My new agent',
    calls: 3,
    timeInCall: '12s in call',
    status: 'active' as const
  },
  {
    id: 4,
    name: '101 conseils',
    calls: 19,
    timeInCall: '9m 8s in call',
    status: 'finished' as const
  }
];

const initialCampaigns = [
  {
    id: 1,
    name: 'Campagne Restaurant Midi',
    status: 'pending' as const,
    calls: 0,
    duration: '0m',
    agent: 'Restaurant Order Taking',
    phoneNumber: '+33 1 23 45 67 89'
  },
  {
    id: 2,
    name: 'Support Client Weekend',
    status: 'active' as const,
    calls: 15,
    duration: '2h 30m',
    agent: 'My new agent',
    phoneNumber: '+33 1 98 76 54 32'
  },
  {
    id: 3,
    name: 'Promotion Été 2024',
    status: 'finished' as const,
    calls: 45,
    duration: '8h 15m',
    agent: '101 conseils',
    phoneNumber: '+33 1 55 44 33 22'
  },
  {
    id: 4,
    name: 'Test Nouveau Script',
    status: 'paused' as const,
    calls: 3,
    duration: '15m',
    agent: 'Restaurant Order Taking',
    phoneNumber: '+33 1 23 45 67 89'
  }
];

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCampaignDialogOpen, setIsCampaignDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgents] = useState(initialAgents);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [currentView, setCurrentView] = useState('agents');
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNewAgent = () => {
    setSelectedAgent(null);
    setIsDialogOpen(true);
  };

  const handleNewCampaign = () => {
    setIsCampaignDialogOpen(true);
  };

  const handleCloseCampaignDialog = () => {
    setIsCampaignDialogOpen(false);
  };

  const handleAgentClick = (agent) => {
    console.log('Agent clicked:', agent.name);
    setSelectedAgent(agent);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedAgent(null);
  };

  const handleDeleteAgent = (agentId: number) => {
    const agentToDelete = agents.find(agent => agent.id === agentId);
    setAgents(agents.filter(agent => agent.id !== agentId));
    
    toast({
      title: "Agent supprimé",
      description: `L'agent "${agentToDelete?.name}" a été supprimé avec succès.`,
    });
  };

  const handleDuplicateAgent = (agentId: number) => {
    const agentToDuplicate = agents.find(agent => agent.id === agentId);
    if (agentToDuplicate) {
      const newAgent = {
        ...agentToDuplicate,
        id: Math.max(...agents.map(a => a.id)) + 1,
        name: `${agentToDuplicate.name} (Copie)`,
        status: 'pending' as const,
        calls: 0,
        timeInCall: '0s in call'
      };
      setAgents([...agents, newAgent]);
      
      toast({
        title: "Agent dupliqué",
        description: `L'agent "${newAgent.name}" a été créé avec succès.`,
      });
    }
  };

  const handleViewChange = (view: string) => {
    if (view === 'integrations') {
      // Navigate to integrations page
      window.location.href = '/integrations';
      return;
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'call':
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Vos campagnes</h1>
              <p className="text-gray-600">Gérez et suivez vos campagnes d'appels</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  name={campaign.name}
                  status={campaign.status}
                  calls={campaign.calls}
                  duration={campaign.duration}
                  agent={campaign.agent}
                  phoneNumber={campaign.phoneNumber}
                />
              ))}
            </div>
          </div>
        );
      case 'agents':
      default:
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Vos agents</h1>
              <p className="text-gray-600">Gérez et configurez vos agents IA</p>
            </div>
            
            <AgentTable 
              agents={agents}
              onAgentClick={handleAgentClick}
              onDelete={handleDeleteAgent}
              onDuplicate={handleDuplicateAgent}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onNewAgent={handleNewAgent}
          onNewCampaign={handleNewCampaign}
          currentView={currentView}
        />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      <AgentCustomizationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        agentData={selectedAgent}
      />

      <CampaignCreationDialog
        isOpen={isCampaignDialogOpen}
        onClose={handleCloseCampaignDialog}
        agents={agents}
      />
    </div>
  );
};

export default Index;
