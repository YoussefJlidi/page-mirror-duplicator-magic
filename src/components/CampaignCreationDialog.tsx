
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CampaignCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Array<{ id: number; name: string; status: string }>;
}

const CampaignCreationDialog: React.FC<CampaignCreationDialogProps> = ({
  isOpen,
  onClose,
  agents
}) => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignContext, setCampaignContext] = useState('');
  const [campaignObjectives, setCampaignObjectives] = useState('');
  const [generalInstructions, setGeneralInstructions] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState('');
  const { toast } = useToast();

  const integrations = ['Gmail', 'CRM', 'Date', 'Calendar', 'Drive', 'Notion'];

  const toggleIntegration = (integration: string) => {
    setSelectedIntegrations(prev => 
      prev.includes(integration) 
        ? prev.filter(i => i !== integration)
        : [...prev, integration]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignName || !selectedAgent) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au moins le nom de la campagne et sélectionner un agent.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Campagne créée",
      description: `La campagne "${campaignName}" a été créée avec succès.`,
    });

    // Reset form
    setCampaignName('');
    setCampaignContext('');
    setCampaignObjectives('');
    setGeneralInstructions('');
    setSelectedAgent('');
    setSelectedIntegrations([]);
    setStartDate(undefined);
    setStartTime('');
    onClose();
  };

  const availableAgents = agents.filter(agent => agent.status === 'active' || agent.status === 'pending');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Paramétrer campagne &lt;&lt;Nom de la campagne&gt;&gt;
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="<<Nom de la campagne>>"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent">Sélectionner agent</Label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un agent" />
                </SelectTrigger>
                <SelectContent>
                  {availableAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id.toString()}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Décrivez le contexte de campagne</Label>
            <Textarea
              id="context"
              value={campaignContext}
              onChange={(e) => setCampaignContext(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives">Décrivez vos objectifs de campagnes</Label>
            <Textarea
              id="objectives"
              value={campaignObjectives}
              onChange={(e) => setCampaignObjectives(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Renseigner les instructions générales</Label>
            <Textarea
              id="instructions"
              value={generalInstructions}
              onChange={(e) => setGeneralInstructions(e.target.value)}
              placeholder="Instructions"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <Label>Choisir les intégrations</Label>
            <div className="grid grid-cols-3 gap-3">
              {integrations.map((integration) => (
                <Button
                  key={integration}
                  type="button"
                  variant={selectedIntegrations.includes(integration) ? "default" : "outline"}
                  onClick={() => toggleIntegration(integration)}
                  className="h-12"
                >
                  {integration}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Choisissez quand démarrer la campagne d'appels</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure</Label>
                <Input
                  id="time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Ajouter vos prospects :</Label>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="h-12">
                Csv file
              </Button>
              <Button type="button" className="h-12 bg-gray-600 hover:bg-gray-700">
                Uploader
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 text-lg h-auto"
            >
              Valider la campagne
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignCreationDialog;
