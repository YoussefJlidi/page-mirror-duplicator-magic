
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PhoneIncoming, Settings, Users } from 'lucide-react';

interface InboundCallFormProps {
  agents: Array<{ id: number; name: string; status: string }>;
}

const InboundCallForm: React.FC<InboundCallFormProps> = ({ agents }) => {
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedNumber || !selectedAgent || !campaignName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Campagne de réception configurée",
      description: `La campagne "${campaignName}" est prête à recevoir des appels.`,
    });

    // Reset form
    setSelectedNumber('');
    setSelectedAgent('');
    setCampaignName('');
  };

  // Filtrer les agents actifs pour la sélection
  const availableAgents = agents.filter(agent => agent.status === 'active' || agent.status === 'pending');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Header avec icône */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <PhoneIncoming className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Configurer la réception d'appels</h2>
            <p className="text-gray-600">Configurez votre système pour recevoir et traiter les appels entrants</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="number" className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Numéro de réception
              </Label>
              <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionner un numéro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+33123456789">+33 1 23 45 67 89</SelectItem>
                  <SelectItem value="+33198765432">+33 1 98 76 54 32</SelectItem>
                  <SelectItem value="+33155443322">+33 1 55 44 33 22</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">Numéro sur lequel les clients pourront vous appeler</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent" className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Agent de réception
              </Label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionner un agent" />
                </SelectTrigger>
                <SelectContent>
                  {availableAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id.toString()}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">Agent IA qui répondra aux appels entrants</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign" className="text-lg font-medium text-gray-700">
              Nom de la campagne de réception
            </Label>
            <Input
              id="campaign"
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Ex: Support Client, Prise de commande..."
              className="h-12"
            />
            <p className="text-sm text-gray-500">Nom pour identifier cette campagne de réception</p>
          </div>

          {/* Section configuration avancée */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Configuration avancée</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Heures d'ouverture</Label>
                <div className="flex gap-2">
                  <Input placeholder="09:00" className="h-10" />
                  <span className="flex items-center text-gray-500">-</span>
                  <Input placeholder="18:00" className="h-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Message d'accueil</Label>
                <Input placeholder="Bonjour, que puis-je faire pour vous ?" className="h-10" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 text-lg"
            >
              Activer la réception
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InboundCallForm;
