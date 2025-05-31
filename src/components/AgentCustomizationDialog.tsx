
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings, Play, Volume2, Save, TestTube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AgentCustomizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agentData?: {
    name: string;
    model: string;
    voice: string;
    language: string;
    initialMessage: string;
    prompt: string;
  };
}

const AgentCustomizationDialog: React.FC<AgentCustomizationDialogProps> = ({
  isOpen,
  onClose,
  agentData
}) => {
  const [formData, setFormData] = useState({
    name: agentData?.name || 'Restaurant Order Taking',
    model: agentData?.model || 'GPT-4O',
    backgroundAudio: 'Select a background audio',
    maxCallDuration: 5,
    initialMessage: agentData?.initialMessage || 'La Table Gourmande bonjour, que puis-je faire pour vous ?',
    voice: agentData?.voice || 'Anna',
    transcriber: 'Deepgram',
    language: agentData?.language || 'FR',
    prompt: agentData?.prompt || '#### Rôle:\n\nTu es le réceptionniste téléphonique du restaurant La Table Gourmande, spécialisé dans la prise de commandes et la gestion des réservations. Tu dois être accueillant, professionnel et efficace.\n\n#### Instructions:\n\n1. Accueille chaleureusement les clients\n2. Prends les commandes avec précision\n3. Propose des suggestions pertinentes\n4. Gère les questions sur les allergènes\n5. Confirme toutes les informations importantes',
    supportInterruptions: true,
    interruptionSensitivity: 'medium',
    webhookEnabled: false,
    publicDemo: false
  });

  const handleSave = () => {
    console.log('Configuration sauvegardée:', formData);
    onClose();
  };

  const handleTest = () => {
    console.log('Test de l\'agent en cours...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-black rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Configuration de l'agent</h2>
                <p className="text-sm text-gray-500">Personnalisez votre assistant vocal intelligent</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {agentData ? 'Modification' : 'Création'}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          {/* Section Informations générales */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Informations générales</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Nom de l'agent</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Assistant Restaurant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm font-medium">Modèle IA</Label>
                <Select value={formData.model} onValueChange={(value) => setFormData({ ...formData, model: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPT-4O">GPT-4O (Recommandé)</SelectItem>
                    <SelectItem value="GPT-3.5">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="Claude">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium">Langue</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FR">🇫🇷 Français</SelectItem>
                    <SelectItem value="EN">🇺🇸 English</SelectItem>
                    <SelectItem value="ES">🇪🇸 Español</SelectItem>
                    <SelectItem value="DE">🇩🇪 Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice" className="text-sm font-medium">Voix</Label>
                <div className="flex gap-2">
                  <Select value={formData.voice} onValueChange={(value) => setFormData({ ...formData, voice: value })}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Anna">Anna (Féminine)</SelectItem>
                      <SelectItem value="Brian">Brian (Masculine)</SelectItem>
                      <SelectItem value="Emma">Emma (Énergique)</SelectItem>
                      <SelectItem value="Lucas">Lucas (Chaleureux)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="outline">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Messages</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initial-message" className="text-sm font-medium">Message d'accueil</Label>
                <Input
                  id="initial-message"
                  value={formData.initialMessage}
                  onChange={(e) => setFormData({ ...formData, initialMessage: e.target.value })}
                  placeholder="Première phrase que dira l'agent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-medium">Instructions de l'agent</Label>
                <Textarea
                  id="prompt"
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  rows={6}
                  className="resize-none font-mono text-sm"
                  placeholder="Décrivez le rôle et les instructions détaillées de votre agent..."
                />
              </div>
            </div>
          </div>

          {/* Paramètres avancés */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Paramètres avancés</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transcriber" className="text-sm font-medium">Service de transcription</Label>
                <Select value={formData.transcriber} onValueChange={(value) => setFormData({ ...formData, transcriber: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Deepgram">Deepgram</SelectItem>
                    <SelectItem value="AssemblyAI">AssemblyAI</SelectItem>
                    <SelectItem value="OpenAI">OpenAI Whisper</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Durée maximum d'appel: {formData.maxCallDuration} min</Label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={formData.maxCallDuration}
                  onChange={(e) => setFormData({ ...formData, maxCallDuration: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="interruptions" className="font-medium">Gestion des interruptions</Label>
                <p className="text-sm text-gray-500">Permet aux utilisateurs de couper la parole à l'agent</p>
              </div>
              <Switch
                id="interruptions"
                checked={formData.supportInterruptions}
                onCheckedChange={(checked) => setFormData({ ...formData, supportInterruptions: checked })}
              />
            </div>
          </div>
        </div>

        {/* Footer avec boutons */}
        <div className="border-t border-gray-200 pt-4 mt-6">
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleTest} className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Tester l'agent
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button onClick={handleSave} className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                <Save className="w-4 h-4" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentCustomizationDialog;
