
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Calendar, Users, HardDrive, MessageSquare, Github } from 'lucide-react';

interface IntegrationCardProps {
  name: string;
  status: 'available' | 'coming-soon';
  onConnect?: () => void;
}

const getIcon = (name: string) => {
  const iconMap = {
    'Gmail': Mail,
    'Calendar': Calendar,
    'CRM': Users,
    'Drive': HardDrive,
    'Slack': MessageSquare,
    'Github': Github,
  };
  
  const IconComponent = iconMap[name as keyof typeof iconMap];
  return IconComponent ? <IconComponent className="w-8 h-8 text-gray-600 mb-4" /> : null;
};

const IntegrationCard: React.FC<IntegrationCardProps> = ({ name, status, onConnect }) => {
  return (
    <Card className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
      <CardContent className="flex flex-col items-center text-center p-0">
        {getIcon(name)}
        <h3 className="text-lg font-medium text-gray-900 mb-4">{name.toUpperCase()}</h3>
        <Button
          onClick={onConnect}
          variant={status === 'available' ? 'default' : 'secondary'}
          className={`w-full ${
            status === 'available' 
              ? 'bg-gray-800 hover:bg-gray-900 text-white' 
              : 'bg-gray-400 hover:bg-gray-500 text-white cursor-not-allowed'
          }`}
          disabled={status === 'coming-soon'}
        >
          {status === 'available' ? 'Connecter' : 'À venir'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
