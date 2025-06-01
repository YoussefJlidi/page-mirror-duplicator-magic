
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface IntegrationCardProps {
  name: string;
  icon: React.ReactNode;
  isAvailable: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ name, icon, isAvailable }) => {
  return (
    <Card className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center space-y-4 h-48">
      <CardContent className="flex flex-col items-center space-y-4 p-0">
        <div className="flex items-center justify-center w-16 h-16 text-gray-600">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 uppercase tracking-wide">
          {name}
        </h3>
        <Button 
          className={`px-8 py-2 rounded ${isAvailable 
            ? 'bg-gray-800 hover:bg-gray-900 text-white' 
            : 'bg-gray-600 text-white cursor-not-allowed'
          }`}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Connecter' : 'À venir'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
