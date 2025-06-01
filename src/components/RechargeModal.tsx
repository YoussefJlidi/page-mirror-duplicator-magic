
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink, CreditCard, Key, BarChart, FileText, Settings, Zap, TrendingUp, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RechargeModal: React.FC<RechargeModalProps> = ({ isOpen, onClose }) => {
  const [organizationName, setOrganizationName] = useState('IAP');
  const [organizationId] = useState('6c21812a-d0bd-470c-b828-8adcc4ee658e');
  const [apiKey, setApiKey] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [activeSection, setActiveSection] = useState('usage');
  const { toast } = useToast();

  const handleCopyId = () => {
    navigator.clipboard.writeText(organizationId);
    toast({
      title: "ID copié",
      description: "L'ID de l'organisation a été copié dans le presse-papiers.",
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Modifications sauvegardées",
      description: "Les paramètres de votre organisation ont été mis à jour.",
    });
  };

  const handleRecharge = (amount: string) => {
    toast({
      title: "Recharge initiée",
      description: `Redirection vers le paiement de ${amount}€...`,
    });
  };

  const sidebarItems = [
    { id: 'general', icon: Settings, label: 'General' },
    { id: 'api-keys', icon: Key, label: 'API Keys' },
    { id: 'usage', icon: BarChart, label: 'Usage & Recharge' },
    { id: 'invoice', icon: FileText, label: 'Invoice History' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="p-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold mb-6">Paramètres généraux</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de l'organisation</CardTitle>
                    <CardDescription>
                      Gérez les détails de base de votre organisation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="org-name">Nom de l'organisation</Label>
                      <Input
                        id="org-name"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="org-id">ID de l'organisation</Label>
                      <div className="flex mt-1 gap-2">
                        <Input
                          id="org-id"
                          value={organizationId}
                          readOnly
                          className="flex-1 bg-gray-50 font-mono text-sm"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleCopyId}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Identifiant unique de votre organisation
                      </p>
                    </div>

                    <Button onClick={handleSaveChanges} className="bg-black text-white hover:bg-gray-800">
                      Sauvegarder les modifications
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 'api-keys':
        return (
          <div className="p-8">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-semibold mb-6">Clés API</h2>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Key className="w-5 h-5 mr-2" />
                      Configuration OpenAI
                    </CardTitle>
                    <CardDescription>
                      Configurez votre clé API OpenAI pour alimenter vos agents IA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="openai-key">Clé API OpenAI</Label>
                      <Input
                        id="openai-key"
                        type="password"
                        placeholder="sk-..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="mt-1 font-mono"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Votre clé sera cryptée et stockée en sécurité
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuration ElevenLabs</CardTitle>
                    <CardDescription>
                      Ajoutez votre clé ElevenLabs pour la synthèse vocale
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="elevenlabs-key">Clé API ElevenLabs</Label>
                      <Input
                        id="elevenlabs-key"
                        type="password"
                        placeholder="Entrez votre clé ElevenLabs"
                        className="mt-1 font-mono"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button onClick={handleSaveChanges} className="bg-black text-white hover:bg-gray-800">
                  Sauvegarder toutes les clés
                </Button>
              </div>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-8">Usage & Recharge</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Balance Card */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                    Balance actuelle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">8,45 €</div>
                    <p className="text-gray-500 text-sm">Crédits restants</p>
                    <div className="mt-4 bg-green-50 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Statut:</span>
                        <span className="text-green-600 font-medium">Actif</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Card */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Usage ce mois
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">24,67 €</div>
                    <p className="text-gray-500 text-sm">Consommés en janvier</p>
                    <div className="mt-4 bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tendance:</span>
                        <span className="text-blue-600 font-medium">+12% vs déc.</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Statistiques rapides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Appels ce mois:</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Durée moyenne:</span>
                      <span className="font-medium">3m 45s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Coût par appel:</span>
                      <span className="font-medium">0,02 €</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm text-gray-600">Économies vs vocal:</span>
                      <span className="font-medium text-green-600">-67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recharge Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-yellow-500" />
                  Recharger le compte
                </CardTitle>
                <CardDescription>
                  Ajoutez des crédits à votre compte pour continuer à utiliser nos services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Montants prédéfinis</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['10', '25', '50', '100'].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => handleRecharge(amount)}
                          className="h-16 text-lg font-semibold border-2 hover:border-black hover:bg-gray-50"
                        >
                          <div className="text-center">
                            <div>{amount}€</div>
                            <div className="text-xs text-gray-500">
                              ~{Math.round(parseInt(amount) / 0.02)} appels
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Montant personnalisé</h4>
                    <div className="flex gap-4 max-w-md">
                      <div className="flex-1">
                        <Input 
                          placeholder="Montant en €" 
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="text-lg"
                        />
                      </div>
                      <Button 
                        onClick={() => handleRecharge(customAmount || 'custom')} 
                        className="bg-black text-white hover:bg-gray-800 px-8"
                        disabled={!customAmount}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Recharger
                      </Button>
                    </div>
                    {customAmount && (
                      <p className="text-sm text-gray-500 mt-2">
                        Cela représente environ {Math.round(parseInt(customAmount) / 0.02)} appels
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'invoice':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-8">Historique des factures</h2>
            
            <Card>
              <CardContent className="pt-8">
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune facture disponible</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Les factures apparaîtront ici après vos premiers achats de crédits. 
                    Vous recevrez également une copie par email.
                  </p>
                  <Button variant="outline" onClick={() => handleRecharge('25')}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Effectuer votre premier achat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden p-0">
        <SidebarProvider>
          <div className="flex h-[80vh] w-full">
            {/* Sidebar */}
            <Sidebar className="w-72 border-r">
              <div className="p-6 border-b bg-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <Settings className="w-6 h-6 mr-2" />
                  Organisation
                </h2>
              </div>
              
              <SidebarContent className="bg-gray-50">
                <SidebarGroup className="p-4">
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-2">
                      {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full justify-start h-12 ${
                              activeSection === item.id
                                ? 'bg-white shadow-sm text-gray-900'
                                : 'text-gray-600 hover:bg-white hover:shadow-sm'
                            }`}
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                            {item.id === 'invoice' && <ExternalLink className="w-3 h-3 ml-auto" />}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-white">
              {renderContent()}
            </div>
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};

export default RechargeModal;
