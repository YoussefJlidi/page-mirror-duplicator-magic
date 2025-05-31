
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  {
    name: 'Lun',
    reussies: 12,
    echouees: 8,
  },
  {
    name: 'Mar',
    reussies: 15,
    echouees: 5,
  },
  {
    name: 'Mer',
    reussies: 8,
    echouees: 12,
  },
  {
    name: 'Jeu',
    reussies: 20,
    echouees: 3,
  },
  {
    name: 'Ven',
    reussies: 18,
    echouees: 7,
  },
  {
    name: 'Sam',
    reussies: 10,
    echouees: 15,
  },
  {
    name: 'Dim',
    reussies: 5,
    echouees: 8,
  },
];

const initialCampaigns = [
  {
    id: 1,
    name: 'Campagne Restaurant Midi',
    status: 'pending' as const,
    calls: 0,
    duration: '0m',
    agent: 'Restaurant Order Taking',
    phoneNumber: '+33 1 23 45 67 89'
  },
  {
    id: 2,
    name: 'Support Client Weekend',
    status: 'active' as const,
    calls: 15,
    duration: '2h 30m',
    agent: 'My new agent',
    phoneNumber: '+33 1 98 76 54 32'
  },
  {
    id: 3,
    name: 'Promotion Été 2024',
    status: 'finished' as const,
    calls: 45,
    duration: '8h 15m',
    agent: '101 conseils',
    phoneNumber: '+33 1 55 44 33 22'
  },
  {
    id: 4,
    name: 'Test Nouveau Script',
    status: 'paused' as const,
    calls: 3,
    duration: '15m',
    agent: 'Restaurant Order Taking',
    phoneNumber: '+33 1 23 45 67 89'
  }
];

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const campaign = initialCampaigns.find(c => c.id === parseInt(campaignId || '1'));
  
  if (!campaign) {
    return <div>Campagne non trouvée</div>;
  }

  const statusLabels = {
    pending: 'En attente',
    active: 'Actif',
    finished: 'Terminé',
    paused: 'En pause'
  };

  const statusActions = {
    pending: 'Mettre en pause',
    active: 'Stopper',
    finished: '',
    paused: 'Stopper'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header avec retour */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-600">
                Statut : {statusLabels[campaign.status]}
              </span>
              {statusActions[campaign.status] && (
                <>
                  <span className="text-gray-400">-</span>
                  <Button variant="link" className="p-0 h-auto text-sm text-blue-600">
                    {statusActions[campaign.status]}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="synthese" className="w-full">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="synthese">Synthèse</TabsTrigger>
            <TabsTrigger value="details">Détails</TabsTrigger>
          </TabsList>

          <TabsContent value="synthese" className="space-y-6">
            {/* Statistiques en grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* A APPELER */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-medium text-gray-700">A APPELER</h3>
                    <div className="space-y-2">
                      <Progress value={75} className="w-full" />
                      <div className="text-sm text-gray-600">150 / 200 prospects</div>
                    </div>
                    <Button variant="link" className="text-blue-600">
                      Voir le détails
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* A RELANCER */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-medium text-gray-700">A RELANCER</h3>
                    <div className="space-y-2">
                      <Progress value={45} className="w-full" />
                      <div className="text-sm text-gray-600">45 / 100 prospects</div>
                    </div>
                    <Button variant="link" className="text-blue-600">
                      Voir le détails
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Conversations réussies */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-medium text-gray-700">Conversations réussies</h3>
                    <div className="space-y-2">
                      <Progress value={80} className="w-full" />
                      <div className="text-sm text-gray-600">80 conversations</div>
                    </div>
                    <Button variant="link" className="text-blue-600">
                      Voir le détails
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Conversations échouées */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-medium text-gray-700">Conversations échouées</h3>
                    <div className="space-y-2">
                      <Progress value={20} className="w-full" />
                      <div className="text-sm text-gray-600">20 conversations</div>
                    </div>
                    <Button variant="link" className="text-blue-600">
                      Voir le détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Graphique */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-gray-700">Graphique</h3>
                  <p className="text-sm text-gray-600">(conversations réussies vs conversations échouées)</p>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="reussies" fill="#22c55e" name="Conversations réussies" />
                      <Bar dataKey="echouees" fill="#ef4444" name="Conversations échouées" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Boutons de téléchargement */}
                <div className="flex gap-4 justify-center mt-6">
                  <Button variant="outline">
                    Csv file
                  </Button>
                  <Button className="bg-gray-600 hover:bg-gray-700">
                    Uploader
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <p className="text-gray-500">Contenu des détails à venir...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CampaignDetails;
