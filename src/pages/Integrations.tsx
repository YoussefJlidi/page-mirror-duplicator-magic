
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import IntegrationCard from '@/components/IntegrationCard';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const integrations = [
  { name: 'Gmail', status: 'available' as const },
  { name: 'Calendar', status: 'available' as const },
  { name: 'CRM', status: 'coming-soon' as const },
  { name: 'Drive', status: 'coming-soon' as const },
  { name: 'Slack', status: 'coming-soon' as const },
  { name: 'Github', status: 'coming-soon' as const },
];

const Integrations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleConnect = (integrationName: string) => {
    toast({
      title: "Intégration connectée",
      description: `${integrationName} a été connecté avec succès.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onViewChange={() => {}}
        currentView="integrations"
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onNewAgent={() => {}}
          currentView="integrations"
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Intégrez vos applications préférées</h1>
              <p className="text-gray-600">Connectez vos outils favoris pour une expérience optimisée</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <IntegrationCard
                  key={integration.name}
                  name={integration.name}
                  status={integration.status}
                  onConnect={() => handleConnect(integration.name)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Integrations;
