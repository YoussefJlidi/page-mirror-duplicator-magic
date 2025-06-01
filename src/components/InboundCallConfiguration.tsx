import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Phone, Settings, MessageSquare, Clock, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface InboundCallConfigurationProps {
  onClose: () => void;
  onSave: (config: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

const InboundCallConfiguration: React.FC<InboundCallConfigurationProps> = ({ 
  onClose, 
  onSave, 
  initialData,
  isEditing = false 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1: Numéro et nom
    selectedNumber: '',
    campaignName: '',
    
    // Étape 2: Instructions et contexte
    context: '',
    greeting: '',
    tone: '',
    
    // Étape 3: Configuration avancée
    workingHours: {
      start: '09:00',
      end: '18:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    maxCallDuration: '10',
    transferNumber: '',
    
    // Étape 4: Messages automatiques
    afterHoursMessage: '',
    busyMessage: '',
    endCallMessage: ''
  });

  const { toast } = useToast();

  // Initialiser avec les données existantes si en mode édition
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const availableNumbers = [
    '+33 1 23 45 67 89',
    '+33 1 98 76 54 32',
    '+33 1 55 44 33 22',
    '+33 1 11 22 33 44',
    '+33 1 77 88 99 00'
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professionnel' },
    { value: 'friendly', label: 'Amical' },
    { value: 'formal', label: 'Formel' },
    { value: 'casual', label: 'Décontracté' }
  ];

  const days = [
    { value: 'monday', label: 'Lundi' },
    { value: 'tuesday', label: 'Mardi' },
    { value: 'wednesday', label: 'Mercredi' },
    { value: 'thursday', label: 'Jeudi' },
    { value: 'friday', label: 'Vendredi' },
    { value: 'saturday', label: 'Samedi' },
    { value: 'sunday', label: 'Dimanche' }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateWorkingHours = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [field]: value
      }
    }));
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        days: prev.workingHours.days.includes(day)
          ? prev.workingHours.days.filter(d => d !== day)
          : [...prev.workingHours.days, day]
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (!formData.selectedNumber || !formData.campaignName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au minimum le numéro et le nom de la campagne.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    onClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedNumber && formData.campaignName;
      case 2:
        return formData.context;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Configuration de base</h3>
                <p className="text-sm text-gray-600">Numéro et identification de la campagne</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="number">Numéro de téléphone</Label>
                <Select value={formData.selectedNumber} onValueChange={(value) => updateFormData('selectedNumber', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un numéro" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableNumbers.map((number) => (
                      <SelectItem key={number} value={number}>
                        {number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign">Nom de la campagne</Label>
                <Input
                  id="campaign"
                  value={formData.campaignName}
                  onChange={(e) => updateFormData('campaignName', e.target.value)}
                  placeholder="Ex: Support Client, Prise de commande..."
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Instructions et contexte</h3>
                <p className="text-sm text-gray-600">Définissez le comportement de l'agent</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="context">Contexte et instructions</Label>
                <Textarea
                  id="context"
                  value={formData.context}
                  onChange={(e) => updateFormData('context', e.target.value)}
                  placeholder="Décrivez le rôle de l'agent, les informations qu'il doit connaître, et comment il doit répondre aux clients..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="greeting">Message d'accueil</Label>
                <Input
                  id="greeting"
                  value={formData.greeting}
                  onChange={(e) => updateFormData('greeting', e.target.value)}
                  placeholder="Bonjour, merci d'appeler [Entreprise]. Comment puis-je vous aider ?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Ton de la conversation</Label>
                <Select value={formData.tone} onValueChange={(value) => updateFormData('tone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un ton" />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Configuration avancée</h3>
                <p className="text-sm text-gray-600">Horaires et paramètres techniques</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Heures d'ouverture</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Ouverture</Label>
                    <Input
                      type="time"
                      value={formData.workingHours.start}
                      onChange={(e) => updateWorkingHours('start', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Fermeture</Label>
                    <Input
                      type="time"
                      value={formData.workingHours.end}
                      onChange={(e) => updateWorkingHours('end', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Jours d'ouverture</Label>
                <div className="grid grid-cols-2 gap-2">
                  {days.map((day) => (
                    <Button
                      key={day.value}
                      variant={formData.workingHours.days.includes(day.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDay(day.value)}
                      className="justify-start"
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxDuration">Durée max (min)</Label>
                  <Input
                    id="maxDuration"
                    type="number"
                    value={formData.maxCallDuration}
                    onChange={(e) => updateFormData('maxCallDuration', e.target.value)}
                    placeholder="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transfer">Numéro de transfert</Label>
                  <Input
                    id="transfer"
                    value={formData.transferNumber}
                    onChange={(e) => updateFormData('transferNumber', e.target.value)}
                    placeholder="+33 1 00 00 00 00"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Messages automatiques</h3>
                <p className="text-sm text-gray-600">Personnalisez les messages spéciaux</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="afterHours">Message hors horaires</Label>
                <Textarea
                  id="afterHours"
                  value={formData.afterHoursMessage}
                  onChange={(e) => updateFormData('afterHoursMessage', e.target.value)}
                  placeholder="Nous sommes actuellement fermés. Nos horaires sont..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="busy">Message si occupé</Label>
                <Textarea
                  id="busy"
                  value={formData.busyMessage}
                  onChange={(e) => updateFormData('busyMessage', e.target.value)}
                  placeholder="Tous nos agents sont actuellement occupés..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endCall">Message de fin d'appel</Label>
                <Textarea
                  id="endCall"
                  value={formData.endCallMessage}
                  onChange={(e) => updateFormData('endCallMessage', e.target.value)}
                  placeholder="Merci d'avoir appelé. Bonne journée !"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {isEditing ? 'Modifier la campagne' : 'Configuration des appels entrants'}
            </CardTitle>
            <span className="text-sm text-gray-500">Étape {currentStep}/4</span>
          </div>
          <Progress value={(currentStep / 4) * 100} className="mt-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              
              {currentStep < 4 ? (
                <Button 
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSave}
                  className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  {isEditing ? 'Modifier' : 'Finaliser'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InboundCallConfiguration;
