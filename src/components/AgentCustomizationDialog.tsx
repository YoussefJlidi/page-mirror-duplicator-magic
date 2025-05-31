
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
import { Settings, Play, Volume2 } from 'lucide-react';

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
    initialMessage: agentData?.initialMessage || 'La Table Gourmande bonjour, que puis-je faire pour vous',
    voice: agentData?.voice || 'Anna',
    transcriber: 'Deepgram',
    language: agentData?.language || 'FR',
    prompt: agentData?.prompt || '#### Role:\n\nTu es le réceptionniste téléphonique du restaurant La Table Gourmande.',
    supportInterruptions: true,
    interruptionSensitivity: 'low'
  });

  const handleSave = () => {
    console.log('Saving agent configuration:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Agent general settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Default model</Label>
              <div className="flex gap-2">
                <Select value={formData.model} onValueChange={(value) => setFormData({ ...formData, model: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPT-4O">GPT-4O</SelectItem>
                    <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
                    <SelectItem value="Claude">Claude</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="icon" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="background-audio">Background audio</Label>
              <Select value={formData.backgroundAudio} onValueChange={(value) => setFormData({ ...formData, backgroundAudio: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Select a background audio">Select a background audio</SelectItem>
                  <SelectItem value="restaurant-ambiance">Restaurant Ambiance</SelectItem>
                  <SelectItem value="cafe-sounds">Cafe Sounds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Initial message */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="initial-message">Initial message</Label>
              <Button size="icon" variant="ghost" className="w-6 h-6">
                <Settings className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                id="initial-message"
                value={formData.initialMessage}
                onChange={(e) => setFormData({ ...formData, initialMessage: e.target.value })}
                className="flex-1"
              />
              <Button size="icon" variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Max call duration */}
          <div className="space-y-2">
            <Label>Max call duration</Label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="60"
                value={formData.maxCallDuration}
                onChange={(e) => setFormData({ ...formData, maxCallDuration: parseInt(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">{formData.maxCallDuration} mn</span>
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voice">Voice selection</Label>
              <div className="flex gap-2">
                <Select value={formData.voice} onValueChange={(value) => setFormData({ ...formData, voice: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Anna">Anna</SelectItem>
                    <SelectItem value="Brian">Brian</SelectItem>
                    <SelectItem value="Emma">Emma</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="icon" variant="outline">
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transcriber">Transcriber selection</Label>
              <Select value={formData.transcriber} onValueChange={(value) => setFormData({ ...formData, transcriber: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Deepgram">Deepgram</SelectItem>
                  <SelectItem value="AssemblyAI">AssemblyAI</SelectItem>
                  <SelectItem value="OpenAI">OpenAI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FR">FR</SelectItem>
                  <SelectItem value="EN">EN</SelectItem>
                  <SelectItem value="ES">ES</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Agent prompt */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="prompt">Agent base prompt</Label>
              <Button size="icon" variant="ghost" className="w-6 h-6">
                <Settings className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="prompt"
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              rows={6}
              className="resize-none"
            />
          </div>

          {/* Interruptions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="interruptions">Support Interruptions</Label>
                <Button size="icon" variant="ghost" className="w-6 h-6">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
              <Switch
                id="interruptions"
                checked={formData.supportInterruptions}
                onCheckedChange={(checked) => setFormData({ ...formData, supportInterruptions: checked })}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Interruptions sensitivity</Label>
                <span className="text-sm text-gray-500">{formData.interruptionSensitivity}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
              />
              <p className="text-sm text-gray-500">Interruption after 3 words</p>
            </div>
          </div>

          {/* Collapsible sections */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Webhook</h3>
                  <p className="text-sm text-gray-500">Configure webhooks to receive event notifications.</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Public demo page</h3>
                  <p className="text-sm text-gray-500">Generates a shareable public demo page to showcase your agent.</p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Custom vocabulary</h3>
                  <p className="text-sm text-gray-500">Add custom words to help your agent understand them better during speech.</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center pt-4">
            <Button className="bg-black text-white hover:bg-gray-800">
              More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentCustomizationDialog;
