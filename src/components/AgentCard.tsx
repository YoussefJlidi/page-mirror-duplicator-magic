import React, { useState } from 'react';
import { MoreHorizontal, Copy, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

interface AgentCardProps {
  id: number;
  name: string;
  calls: number;
  timeInCall: string;
  status: 'pending' | 'active' | 'finished' | 'inactive';
  onClick?: () => void;
  onDelete?: (id: number) => void;
  onDuplicate?: (id: number) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  id, 
  name, 
  calls, 
  timeInCall, 
  status, 
  onClick, 
  onDelete, 
  onDuplicate 
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDuplicate = () => {
    console.log('Dupliquer l\'agent:', name);
    if (onDuplicate) {
      onDuplicate(id);
    }
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    console.log('Supprimer l\'agent:', name);
    if (onDelete) {
      onDelete(id);
    }
    setShowDeleteDialog(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente', className: 'bg-orange-100 text-orange-800 hover:bg-orange-100' };
      case 'active':
        return { label: 'Actif', className: 'bg-green-100 text-green-800 hover:bg-green-100' };
      case 'finished':
        return { label: 'Terminé', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' };
      case 'inactive':
        return { label: 'Inactif', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' };
      default:
        return { label: 'Inconnu', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <>
      <div 
        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
            <Badge className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
                onClick={(e) => e.stopPropagation()}
              >
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'agent</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'agent "{name}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AgentCard;
