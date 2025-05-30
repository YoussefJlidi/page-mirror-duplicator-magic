
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface AgentCardProps {
  name: string;
  calls: number;
  timeInCall: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, calls, timeInCall }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{calls}</span>
          <span className="text-sm text-gray-500">calls</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">{timeInCall}</span>
          <span className="text-sm text-gray-500">in call</span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
