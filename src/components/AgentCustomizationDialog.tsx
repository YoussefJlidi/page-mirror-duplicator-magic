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
import { Settings, Play, Volume2, Save, TestTube, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AgentTestDialog from './AgentTestDialog';

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
  const isCreating = !agentData;
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: agentData?.name || '',
    model: agentData?.model || 'GPT-4O',
    backgroundAudio: 'Select a background audio',
    maxCallDuration: 5,
    initialMessage: agentData?.initialMessage || '',
    voice: agentData?.voice || 'Anna',
    transcriber: 'Deepgram',
    language: agentData?.language || 'FR',
    prompt: agentData?.prompt || '',
    supportInterruptions: true,
    interruptionSensitivity: 'medium',
    webhookEnabled: false,
    publicDemo: false
  });

  const [touched, setTouched] = useState({
    name: false,
    initialMessage: false,
    prompt: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setTouched({ ...touched, [field]: true });
  };

  const handleSave = () => {
    console.log('Configuration sauvegardée:', formData);
    onClose();
  };

  const handleTest = () => {
    setIsTestDialogOpen(true);
  };

  const handleCloseTestDialog = () => {
    setIsTestDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b border-gray-200 pb-4">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-black rounded-lg flex items-center justify-center">
                  {isCreating ? (
                    <Plus className="w-5 h-5 text-white" />
                  ) : (
                    <Settings className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {isCreating ? 'Créer un nouvel agent' : 'Configuration de l\'agent'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isCreating 
                      ? 'Configurez votre nouveau assistant vocal intelligent' 
                      : 'Modifiez votre assistant vocal intelligent'
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {isCreating ? 'Création' : 'Modification'}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-6">
            {/* Section Informations générales */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Informations générales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nom de l'agent *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={isCreating ? "Ex: Assistant Restaurant" : "Nom de l'agent"}
                    className={isCreating && touched.name && !formData.name ? "border-red-300" : ""}
                  />
                  {isCreating && touched.name && !formData.name && (
                    <p className="text-xs text-red-500">Le nom de l'agent est requis</p>
                  )}
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
                  <Label htmlFor="initial-message" className="text-sm font-medium">
                    Message d'accueil {isCreating ? '*' : ''}
                  </Label>
                  <Input
                    id="initial-message"
                    value={formData.initialMessage}
                    onChange={(e) => handleInputChange('initialMessage', e.target.value)}
                    placeholder={isCreating ? "Ex: Bonjour, que puis-je faire pour vous ?" : "Première phrase que dira l'agent"}
                    className={isCreating && touched.initialMessage && !formData.initialMessage ? "border-red-300" : ""}
                  />
                  {isCreating && touched.initialMessage && !formData.initialMessage && (
                    <p className="text-xs text-red-500">Le message d'accueil est requis</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-sm font-medium">
                    Instructions de l'agent {isCreating ? '*' : ''}
                  </Label>
                  <Textarea
                    id="prompt"
                    value={formData.prompt}
                    onChange={(e) => handleInputChange('prompt', e.target.value)}
                    rows={6}
                    className={`resize-none font-mono text-sm ${isCreating && touched.prompt && !formData.prompt ? "border-red-300" : ""}`}
                    placeholder={isCreating 
                      ? "Décrivez le rôle et les comportements de votre agent...\n\nEx:\nTu es un assistant pour...\n- Comportement 1\n- Comportement 2" 
                      : "Décrivez le rôle et les instructions détaillées de votre agent..."
                    }
                  />
                  {isCreating && touched.prompt && !formData.prompt && (
                    <p className="text-xs text-red-500">Les instructions sont requises</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {isCreating 
                      ? "Définissez clairement le rôle et les comportements attendus de votre agent"
                      : "Utilisez Markdown pour formater vos instructions"
                    }
                  </p>
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
                <Button 
                  onClick={handleSave} 
                  className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
                  disabled={isCreating && (!formData.name || !formData.initialMessage || !formData.prompt)}
                >
                  <Save className="w-4 h-4" />
                  {isCreating ? 'Créer l\'agent' : 'Sauvegarder'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AgentTestDialog
        isOpen={isTestDialogOpen}
        onClose={handleCloseTestDialog}
        agentName={formData.name || 'Agent de test'}
      />
    </>
  );
};

export default AgentCustomizationDialog;
