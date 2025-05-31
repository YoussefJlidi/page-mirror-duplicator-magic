
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
import { Settings, Play, Volume2, Save, TestTube, Zap, ChevronDown, ChevronUp } from 'lucide-react';
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
    publicDemo: false,
    customVocabulary: '',
    endCallMessage: 'Merci pour votre commande. À bientôt !',
    fallbackMessage: 'Je suis désolé, je n\'ai pas bien compris. Pouvez-vous répéter ?',
    maxRetries: 3,
    responseTime: 'fast',
    emotionalTone: 'friendly'
  });

  const [expandedSections, setExpandedSections] = useState({
    advanced: false,
    webhook: false,
    demo: false,
    vocabulary: false
  });

  const handleSave = () => {
    console.log('Configuration sauvegardée:', formData);
    onClose();
  };

  const handleTest = () => {
    console.log('Test de l\'agent en cours...');
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
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

        <div className="space-y-8 pt-6">
          {/* Section Informations générales */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Informations générales</h3>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Nom de l'agent</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Assistant Restaurant"
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm font-medium">Modèle IA</Label>
                <div className="flex gap-2">
                  <Select value={formData.model} onValueChange={(value) => setFormData({ ...formData, model: value })}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GPT-4O">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          GPT-4O (Recommandé)
                        </div>
                      </SelectItem>
                      <SelectItem value="GPT-3.5">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="Claude">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="outline" className="shrink-0">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
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
            </div>
          </div>

          {/* Section Audio et Voix */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Configuration audio</h3>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="voice" className="text-sm font-medium">Voix de l'assistant</Label>
                <div className="flex gap-2">
                  <Select value={formData.voice} onValueChange={(value) => setFormData({ ...formData, voice: value })}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Anna">Anna (Féminine, Douce)</SelectItem>
                      <SelectItem value="Brian">Brian (Masculine, Professionnel)</SelectItem>
                      <SelectItem value="Emma">Emma (Féminine, Énergique)</SelectItem>
                      <SelectItem value="Lucas">Lucas (Masculine, Chaleureux)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="outline">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transcriber" className="text-sm font-medium">Service de transcription</Label>
                <Select value={formData.transcriber} onValueChange={(value) => setFormData({ ...formData, transcriber: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Deepgram">Deepgram (Précis)</SelectItem>
                    <SelectItem value="AssemblyAI">AssemblyAI (Rapide)</SelectItem>
                    <SelectItem value="OpenAI">OpenAI Whisper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background-audio" className="text-sm font-medium">Audio d'ambiance</Label>
              <Select value={formData.backgroundAudio} onValueChange={(value) => setFormData({ ...formData, backgroundAudio: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucun</SelectItem>
                  <SelectItem value="restaurant-ambiance">Ambiance restaurant</SelectItem>
                  <SelectItem value="cafe-sounds">Sons de café</SelectItem>
                  <SelectItem value="office-quiet">Bureau silencieux</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Messages et Prompts */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Messages et comportement</h3>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initial-message" className="text-sm font-medium">Message d'accueil</Label>
                <div className="flex gap-2">
                  <Input
                    id="initial-message"
                    value={formData.initialMessage}
                    onChange={(e) => setFormData({ ...formData, initialMessage: e.target.value })}
                    className="flex-1"
                    placeholder="Première phrase que dira l'agent"
                  />
                  <Button size="icon" variant="outline">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-medium">Instructions de l'agent</Label>
                <Textarea
                  id="prompt"
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  rows={8}
                  className="resize-none font-mono text-sm"
                  placeholder="Décrivez le rôle et les instructions détaillées de votre agent..."
                />
                <p className="text-xs text-gray-500">Utilisez Markdown pour formater vos instructions</p>
              </div>
            </div>
          </div>

          {/* Paramètres d'appel */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Paramètres d'appel</h3>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Durée maximum d'appel</Label>
                    <span className="text-sm font-medium text-blue-600">{formData.maxCallDuration} min</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={formData.maxCallDuration}
                    onChange={(e) => setFormData({ ...formData, maxCallDuration: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="response-time">Vitesse de réponse</Label>
                  <Select value={formData.responseTime} onValueChange={(value) => setFormData({ ...formData, responseTime: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Rapide (< 1s)</SelectItem>
                      <SelectItem value="medium">Modéré (1-2s)</SelectItem>
                      <SelectItem value="slow">Réfléchi (2-3s)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emotional-tone">Ton émotionnel</Label>
                  <Select value={formData.emotionalTone} onValueChange={(value) => setFormData({ ...formData, emotionalTone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Amical</SelectItem>
                      <SelectItem value="professional">Professionnel</SelectItem>
                      <SelectItem value="enthusiastic">Enthousiaste</SelectItem>
                      <SelectItem value="calm">Calme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-retries">Tentatives max en cas d'incompréhension</Label>
                  <Select value={formData.maxRetries.toString()} onValueChange={(value) => setFormData({ ...formData, maxRetries: parseInt(value) })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 tentative</SelectItem>
                      <SelectItem value="2">2 tentatives</SelectItem>
                      <SelectItem value="3">3 tentatives</SelectItem>
                      <SelectItem value="5">5 tentatives</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Interruptions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <Label htmlFor="interruptions" className="font-medium">Gestion des interruptions</Label>
                  <p className="text-sm text-gray-500">Permet aux utilisateurs de couper la parole à l'agent</p>
                </div>
              </div>
              <Switch
                id="interruptions"
                checked={formData.supportInterruptions}
                onCheckedChange={(checked) => setFormData({ ...formData, supportInterruptions: checked })}
              />
            </div>
            
            {formData.supportInterruptions && (
              <div className="space-y-2 ml-4">
                <div className="flex items-center justify-between">
                  <Label>Sensibilité aux interruptions</Label>
                  <span className="text-sm text-gray-500 capitalize">{formData.interruptionSensitivity}</span>
                </div>
                <Select value={formData.interruptionSensitivity} onValueChange={(value) => setFormData({ ...formData, interruptionSensitivity: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible (plus de mots requis)</SelectItem>
                    <SelectItem value="medium">Moyenne (équilibrée)</SelectItem>
                    <SelectItem value="high">Élevée (interruption rapide)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Sections extensibles */}
          <div className="space-y-4">
            {/* Section Webhook */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('webhook')}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <h4 className="font-medium">Configuration Webhook</h4>
                    <p className="text-sm text-gray-500">Recevez des notifications d'événements en temps réel</p>
                  </div>
                </div>
                {expandedSections.webhook ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {expandedSections.webhook && (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Activer les webhooks</Label>
                    <Switch
                      checked={formData.webhookEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, webhookEnabled: checked })}
                    />
                  </div>
                  {formData.webhookEnabled && (
                    <div className="space-y-2">
                      <Label>URL de webhook</Label>
                      <Input placeholder="https://votre-site.com/webhook" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Section Demo publique */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('demo')}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Play className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <h4 className="font-medium">Page de démonstration publique</h4>
                    <p className="text-sm text-gray-500">Créez une page partageable pour tester votre agent</p>
                  </div>
                </div>
                {expandedSections.demo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {expandedSections.demo && (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Activer la page de démo</Label>
                    <Switch
                      checked={formData.publicDemo}
                      onCheckedChange={(checked) => setFormData({ ...formData, publicDemo: checked })}
                    />
                  </div>
                  {formData.publicDemo && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Votre page de démo sera accessible à l'adresse : 
                        <br />
                        <span className="font-mono text-blue-600">demo.votre-agent.com/{formData.name.toLowerCase().replace(/\s+/g, '-')}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleTest} className="flex items-center gap-2">
                <TestTube className="w-4 h-4" />
                Tester l'agent
              </Button>
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
            </div>
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2">
              <Save className="w-4 h-4" />
              {agentData ? 'Sauvegarder les modifications' : 'Créer l\'agent'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentCustomizationDialog;
