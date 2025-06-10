
import React, { useState } from 'react';
import { User, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AgentTable from '@/components/AgentTable';
import { useToast } from '@/hooks/use-toast';

interface HumanAgent {
  id: number;
  name: string;
  calls: number;
  timeInCall: string;
  status: 'pending' | 'active' | 'inactive' | 'finished';
}

const initialHumanAgents: HumanAgent[] = [
  {
    id: 1,
    name: 'Agent Commercial Sarah',
    calls: 15,
    timeInCall: '2h 30m in call',
    status: 'active'
  },
  {
    id: 2,
    name: 'Support Client Marc',
    calls: 8,
    timeInCall: '1h 15m in call',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Conseiller Technique Julie',
    calls: 23,
    timeInCall: '4h 05m in call',
    status: 'finished'
  },
  {
    id: 4,
    name: 'Agent Vente Paul',
    calls: 0,
    timeInCall: '0s in call',
    status: 'inactive'
  }
];

const HumanCalls = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [humanAgents, setHumanAgents] = useState(initialHumanAgents);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNewHumanAgent = () => {
    console.log('Créer un nouvel agent humain');
    // Logique pour créer un nouvel agent humain
  };

  const handleAgentClick = (agent: HumanAgent) => {
    console.log('Agent humain cliqué:', agent.name);
    // Logique pour modifier l'agent humain
  };

  const handleDeleteAgent = (agentId: number) => {
    const agentToDelete = humanAgents.find(agent => agent.id === agentId);
    setHumanAgents(humanAgents.filter(agent => agent.id !== agentId));
    
    toast({
      title: "Agent humain supprimé",
      description: `L'agent "${agentToDelete?.name}" a été supprimé avec succès.`,
    });
  };

  const handleDuplicateAgent = (agentId: number) => {
    const agentToDuplicate = humanAgents.find(agent => agent.id === agentId);
    if (agentToDuplicate) {
      const newAgent = {
        ...agentToDuplicate,
        id: Math.max(...humanAgents.map(a => a.id)) + 1,
        name: `${agentToDuplicate.name} (Copie)`,
        status: 'pending' as const,
        calls: 0,
        timeInCall: '0s in call'
      };
      setHumanAgents([...humanAgents, newAgent]);
      
      toast({
        title: "Agent humain dupliqué",
        description: `L'agent "${newAgent.name}" a été créé avec succès.`,
      });
    }
  };

  const getActiveAgentsCount = () => humanAgents.filter(agent => agent.status === 'active').length;
  const getPendingAgentsCount = () => humanAgents.filter(agent => agent.status === 'pending').length;
  const getTotalCalls = () => humanAgents.reduce((total, agent) => total + agent.calls, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        currentView="human"
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onNewAgent={handleNewHumanAgent}
          currentView="human"
        />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Agents humains</h1>
                <p className="text-gray-600">Gérez et configurez vos agents humains</p>
              </div>
              <Button 
                onClick={handleNewHumanAgent}
                className="bg-black text-white hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvel agent humain
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total agents</CardTitle>
                <User className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{humanAgents.length}</div>
                <p className="text-xs text-muted-foreground">Agents humains configurés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Agents actifs</CardTitle>
                <User className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getActiveAgentsCount()}</div>
                <p className="text-xs text-muted-foreground">En cours d'utilisation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                <User className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getPendingAgentsCount()}</div>
                <p className="text-xs text-muted-foreground">Prêts à être utilisés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total appels</CardTitle>
                <User className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTotalCalls()}</div>
                <p className="text-xs text-muted-foreground">Appels effectués</p>
              </CardContent>
            </Card>
          </div>

          {/* Agents Table */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vos agents humains</h2>
            <AgentTable 
              agents={humanAgents}
              onAgentClick={handleAgentClick}
              onDelete={handleDeleteAgent}
              onDuplicate={handleDuplicateAgent}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HumanCalls;
