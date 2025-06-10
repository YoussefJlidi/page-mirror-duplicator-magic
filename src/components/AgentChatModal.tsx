
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Agent {
  id: number;
  name: string;
}

interface Campaign {
  id: number;
  name: string;
}

interface AgentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
  campaigns: Campaign[];
}

const AgentChatModal: React.FC<AgentChatModalProps> = ({ 
  isOpen, 
  onClose, 
  agents, 
  campaigns 
}) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const navigate = useNavigate();

  const handleStartChat = () => {
    if (selectedAgent && selectedCampaign) {
      console.log(`Démarrage du chat avec l'agent ${selectedAgent} pour la campagne ${selectedCampaign}`);
      navigate(`/agent/${selectedAgent}/chat?campaign=${selectedCampaign}`);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedAgent('');
    setSelectedCampaign('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Discuter avec un agent</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Choisir un agent
            </label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id.toString()}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Choisir une campagne
            </label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une campagne" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id.toString()}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
            >
              Annuler
            </Button>
            <Button
              onClick={handleStartChat}
              disabled={!selectedAgent || !selectedCampaign}
              className="bg-black text-white hover:bg-gray-800"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Commencer le chat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentChatModal;
