
import React from 'react';
import IntegrationCard from '@/components/IntegrationCard';
import { Mail, Calendar, Database, HardDrive, Slack, Github } from 'lucide-react';

const Integrations: React.FC = () => {
  const integrations = [
    {
      name: 'GMAIL',
      icon: <Mail className="w-12 h-12" />,
      isAvailable: true,
    },
    {
      name: 'CALENDAR',
      icon: <Calendar className="w-12 h-12" />,
      isAvailable: true,
    },
    {
      name: 'CRM',
      icon: <Database className="w-12 h-12" />,
      isAvailable: false,
    },
    {
      name: 'DRIVE',
      icon: <HardDrive className="w-12 h-12" />,
      isAvailable: false,
    },
    {
      name: 'Slack',
      icon: <Slack className="w-12 h-12" />,
      isAvailable: false,
    },
    {
      name: 'Github',
      icon: <Github className="w-12 h-12" />,
      isAvailable: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Intégrez vos applications préférées
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => (
          <IntegrationCard
            key={index}
            name={integration.name}
            icon={integration.icon}
            isAvailable={integration.isAvailable}
          />
        ))}
      </div>
    </div>
  );
};

export default Integrations;
