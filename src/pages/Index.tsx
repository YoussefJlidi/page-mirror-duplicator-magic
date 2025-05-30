
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AgentCard from '@/components/AgentCard';

const agents = [
  {
    id: 1,
    name: 'Restaurant Order Taking',
    calls: 0,
    timeInCall: '0s in call'
  },
  {
    id: 2,
    name: 'Restaurant Order Taking',
    calls: 0,
    timeInCall: '0s in call'
  },
  {
    id: 3,
    name: 'My new agent',
    calls: 3,
    timeInCall: '12s in call'
  },
  {
    id: 4,
    name: '101 conseils',
    calls: 19,
    timeInCall: '9m 8s in call'
  }
];

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                name={agent.name}
                calls={agent.calls}
                timeInCall={agent.timeInCall}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
