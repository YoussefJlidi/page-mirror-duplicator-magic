import React from 'react';
import { MoreHorizontal, Copy, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AgentCardProps {
  name: string;
  calls: number;
  timeInCall: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, calls, timeInCall }) => {
  const handleDuplicate = () => {
    console.log('Dupliquer l\'agent:', name);
  };

  const handleDelete = () => {
    console.log('Supprimer l\'agent:', name);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleDuplicate} className="cursor-pointer">
              <Copy className="w-4 h-4 mr-2" />
              Dupliquer
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete} 
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
