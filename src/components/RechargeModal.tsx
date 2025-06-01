
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink, CreditCard, Key, BarChart, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RechargeModal: React.FC<RechargeModalProps> = ({ isOpen, onClose }) => {
  const [organizationName, setOrganizationName] = useState('IAP');
  const [organizationId] = useState('6c21812a-d0bd-470c-b828-8adcc4ee658e');
  const [apiKey, setApiKey] = useState('');
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Organisation</DialogTitle>
        </DialogHeader>
        
        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50 p-4">
            <Tabs defaultValue="general" orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-rows-4 h-auto bg-transparent">
                <TabsTrigger 
                  value="general" 
                  className="justify-start data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="api-keys"
                  className="justify-start data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  API Keys
                </TabsTrigger>
                <TabsTrigger 
                  value="usage"
                  className="justify-start data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Usage
                </TabsTrigger>
                <TabsTrigger 
                  value="invoice"
                  className="justify-start data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center justify-between w-full">
                    Invoice History
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 ml-4">
                <TabsContent value="general" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">General</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="org-name">Organization Name</Label>
                          <Input
                            id="org-name"
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                            className="mt-1"
                          />
                          <p className="text-sm text-gray-500 mt-1">The name of your organization.</p>
                        </div>

                        <div>
                          <Label htmlFor="org-id">Organization ID</Label>
                          <div className="flex mt-1">
                            <Input
                              id="org-id"
                              value={organizationId}
                              readOnly
                              className="flex-1 bg-gray-50"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={handleCopyId}
                              className="ml-2"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Your organization's unique identifier.</p>
                        </div>

                        <Button onClick={handleSaveChanges} className="bg-black text-white hover:bg-gray-800">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="api-keys" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Key className="w-5 h-5 mr-2" />
                        API Keys
                      </h3>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Configuration API</CardTitle>
                          <CardDescription>
                            Configurez vos clés API pour les services externes
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="openai-key">OpenAI API Key</Label>
                            <Input
                              id="openai-key"
                              type="password"
                              placeholder="sk-..."
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="elevenlabs-key">ElevenLabs API Key</Label>
                            <Input
                              id="elevenlabs-key"
                              type="password"
                              placeholder="Entrez votre clé ElevenLabs"
                              className="mt-1"
                            />
                          </div>

                          <Button onClick={handleSaveChanges} className="bg-black text-white hover:bg-gray-800">
                            Sauvegarder les clés
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <BarChart className="w-5 h-5 mr-2" />
                        Usage & Recharge
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Balance actuelle</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold text-green-600">8,45 €</p>
                            <p className="text-sm text-gray-500">Crédits restants</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Usage ce mois</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold">24,67 €</p>
                            <p className="text-sm text-gray-500">Consommés en janvier</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Recharger le compte
                          </CardTitle>
                          <CardDescription>
                            Ajoutez des crédits à votre compte
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['10', '25', '50', '100'].map((amount) => (
                              <Button
                                key={amount}
                                variant="outline"
                                onClick={() => handleRecharge(amount)}
                                className="h-12"
                              >
                                {amount}€
                              </Button>
                            ))}
                          </div>
                          
                          <div className="mt-4 flex gap-2">
                            <Input 
                              placeholder="Montant personnalisé" 
                              type="number"
                              className="flex-1"
                            />
                            <Button onClick={() => handleRecharge('custom')} className="bg-black text-white hover:bg-gray-800">
                              Recharger
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="invoice" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Historique des factures
                      </h3>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-8">
                            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500">Aucune facture disponible</p>
                            <p className="text-sm text-gray-400">Les factures apparaîtront ici après vos premiers achats</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RechargeModal;
