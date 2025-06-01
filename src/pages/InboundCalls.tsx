
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, PhoneIncoming, Clock, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, RotateCcw, Play, Phone, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import InboundCallConfiguration from '@/components/InboundCallConfiguration';

const InboundCalls = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Données pour les campagnes d'appels entrants configurées
  const configuredInboundCampaigns = [
    {
      id: 1,
      title: 'Support Client',
      number: '+33 1 23 45 67 89',
      agent: 'Assistant Support',
      status: 'active',
      callsToday: 23
    },
    {
      id: 2,
      title: 'Prise de commande',
      number: '+33 1 98 76 54 32',
      agent: 'Agent Commercial',
      status: 'inactive',
      callsToday: 0
    },
    {
      id: 3,
      title: 'Information produits',
      number: '+33 1 55 44 33 22',
      agent: 'Conseiller Produit',
      status: 'active',
      callsToday: 15
    }
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleConfigureCalls = () => {
    setIsConfigDialogOpen(true);
  };

  const handleSaveConfiguration = (config: any) => {
    console.log('Configuration sauvegardée:', config);
    // Ici vous pouvez ajouter la logique pour sauvegarder la configuration
  };

  const handleCampaignSettings = (campaignId: number) => {
    console.log(`Configuration de la campagne ${campaignId}`);
    // Ici vous pouvez ajouter la logique pour configurer une campagne spécifique
  };

  const handleCreateNewCampaign = () => {
    setIsConfigDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onViewChange={() => {}}
        currentView="receive"
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onNewAgent={() => {}}
          currentView="receive"
        />
        
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header avec bouton retour */}
            <div className="flex items-center gap-4 mb-8">
              <Link to="/">
                <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <PhoneIncoming className="h-8 w-8 text-black" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Recevoir un appel</h1>
              </div>
            </div>

            {/* Bouton Configurer des appels avec modal */}
            <div className="flex justify-end mb-6">
              <Button 
                onClick={handleConfigureCalls}
                className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Configurer des appels
              </Button>
            </div>

            {/* Dialog avec le nouveau composant de configuration */}
            <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <InboundCallConfiguration 
                  onClose={() => setIsConfigDialogOpen(false)}
                  onSave={handleSaveConfiguration}
                />
              </DialogContent>
            </Dialog>

            {/* Vignettes des campagnes configurées */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Campagnes configurées</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {configuredInboundCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${campaign.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className={`text-sm font-medium ${campaign.status === 'active' ? 'text-green-600' : 'text-gray-500'}`}>
                            {campaign.status === 'active' ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleCampaignSettings(campaign.id)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{campaign.number}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{campaign.agent}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIncoming className="h-4 w-4" />
                          <span>{campaign.callsToday} appels aujourd'hui</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Carte pour ajouter une nouvelle campagne */}
                <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                  <CardContent 
                    className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]"
                    onClick={handleCreateNewCampaign}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Nouvelle campagne</h3>
                    <p className="text-sm text-gray-500 mb-4">Configurer une nouvelle campagne d'appels entrants</p>
                    <Button variant="outline" size="sm">
                      Créer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InboundCalls;
