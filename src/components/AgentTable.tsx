
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreVertical, Play, Copy, Trash2, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Agent {
  id: number;
  name: string;
  calls: number;
  timeInCall: string;
  status: 'pending' | 'active' | 'inactive' | 'finished';
}

interface AgentTableProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
  onDelete: (agentId: number) => void;
  onDuplicate: (agentId: number) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  finished: 'bg-blue-100 text-blue-800'
};

const statusLabels = {
  pending: 'En attente',
  active: 'Actif',
  inactive: 'Inactif',
  finished: 'Terminé'
};

// Liste des campagnes en cours (exemple)
const currentCampaigns = [
  { id: 1, name: 'Campagne Commerciale Q4' },
  { id: 2, name: 'Support Client Premium' },
  { id: 3, name: 'Prospection Nouveaux Clients' },
  { id: 4, name: 'Campagne de Relance' }
];

const AgentTable: React.FC<AgentTableProps> = ({ agents, onAgentClick, onDelete, onDuplicate }) => {
  const handleAddToCampaign = (agent: Agent, campaignId: string) => {
    const campaign = currentCampaigns.find(c => c.id.toString() === campaignId);
    console.log(`Ajout de l'agent ${agent.name} à la campagne ${campaign?.name}`);
    // Logique pour ajouter l'agent à la campagne
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom de l'agent</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Appels</TableHead>
            <TableHead>Temps d'appel</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.id} className="cursor-pointer hover:bg-gray-50">
              <TableCell 
                className="font-medium"
                onClick={() => onAgentClick(agent)}
              >
                {agent.name}
              </TableCell>
              <TableCell onClick={() => onAgentClick(agent)}>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[agent.status]}`}>
                  {statusLabels[agent.status]}
                </span>
              </TableCell>
              <TableCell onClick={() => onAgentClick(agent)}>
                {agent.calls}
              </TableCell>
              <TableCell onClick={() => onAgentClick(agent)}>
                {agent.timeInCall}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={(value) => handleAddToCampaign(agent, value)}>
                    <SelectTrigger className="w-[140px] h-8">
                      <div className="flex items-center truncate">
                        <Plus className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Ajouter à..." />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {currentCampaigns.map((campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id.toString()}>
                          {campaign.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onAgentClick(agent)}>
                        <Play className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(agent.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(agent.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgentTable;
