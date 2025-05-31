import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Clock, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, RotateCcw, FileText, Edit, PhoneIncoming } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CallDetailsModal from '@/components/CallDetailsModal';

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
  const [isCallDetailsModalOpen, setIsCallDetailsModalOpen] = useState(false);
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

  // Données simulées pour les statistiques
  const stats = {
    total: 500,
    successful: 180,
    failed: 95,
    toCall: 160,
    toRetry: 65
  };

  const successRate = Math.round((stats.successful / (stats.failed + stats.successful)) * 100);
  const completionRate = Math.round(((stats.successful + stats.failed) / stats.total) * 100);

  // Extrait des appels pour la section Top appels (simplifié)
  const topCallsExtract = [
    {
      fromNumber: '+33 6 46 67 36 34',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '13/04',
      time: '14:34',
      type: 'entrant',
      duration: '0\'11',
      cost: '€ 0.03',
      status: 'terminé'
    },
    {
      fromNumber: '+33 6 46 67 36 34',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '19:20',
      type: 'entrant',
      duration: '0\'43',
      cost: '€ 0.11',
      status: 'terminé'
    },
    {
      fromNumber: '+33 6 46 67 36 34',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '19:05',
      type: 'entrant',
      duration: '0\'24',
      cost: '€ 0.06',
      status: 'terminé'
    },
    {
      fromNumber: '+33 6 35 48 51 72',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '19:05',
      type: 'entrant',
      duration: '0\'16',
      cost: '€ 0.04',
      status: 'terminé'
    },
    {
      fromNumber: '+33 6 50 76 71 18',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '11:01',
      type: 'entrant',
      duration: '0\'49',
      cost: '€ 0.13',
      status: 'terminé'
    }
  ];

  const handleOpenCallDetails = () => {
    setIsCallDetailsModalOpen(true);
  };

  const handleCloseCallDetails = () => {
    setIsCallDetailsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:bg-gray-200">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
        </div>

        {/* Section en haut avec informations agent et actions */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Informations de l'agent */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="font-medium">{campaign.agent}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-600" />
                <span>{campaign.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span>{campaign.duration}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleOpenCallDetails}>
                <AlertCircle className="h-4 w-4" />
                Plus de détails
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Télécharger le rapport PDF
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Modifier la campagne
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm font-medium text-green-600 mb-1">Appels réussis</p>
              <p className="text-3xl font-bold text-green-900">{stats.successful}</p>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-sm font-medium text-red-600 mb-1">Appels échoués</p>
              <p className="text-3xl font-bold text-red-900">{stats.failed}</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-blue-600 mb-1">À appeler</p>
              <p className="text-3xl font-bold text-blue-900">{stats.toCall}</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <RotateCcw className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-orange-600 mb-1">À relancer</p>
              <p className="text-3xl font-bold text-orange-900">{stats.toRetry}</p>
            </CardContent>
          </Card>
        </div>

        {/* Section principale avec 3 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne 1 - Taux de réussite */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Taux de réussite
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{successRate}%</div>
              <p className="text-sm text-gray-600 mb-4">des appels connectés</p>
              <Progress value={successRate} className="h-3 mb-4" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{stats.successful} réussis</span>
                <span>{stats.failed} échoués</span>
              </div>
            </CardContent>
          </Card>

          {/* Colonne 2 - Progression */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{completionRate}%</div>
              <p className="text-sm text-gray-600 mb-4">de la campagne</p>
              <Progress value={completionRate} className="h-3 mb-4" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{stats.successful + stats.failed} traités</span>
                <span>{stats.total} total</span>
              </div>
            </CardContent>
          </Card>

          {/* Colonne 3 - Informations */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Agent IA</h4>
                <p className="text-sm text-gray-600">{campaign.agent}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Numéro de téléphone</h4>
                <p className="text-sm text-gray-600">{campaign.phoneNumber}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Durée totale</h4>
                <p className="text-sm text-gray-600">{campaign.duration}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Prospects total</h4>
                <p className="text-sm text-gray-600">{stats.total}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Top appels - Style simplifié comme dans l'image */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Détails des appels</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="text-gray-500 font-normal text-sm">Numéro émetteur</TableHead>
                    <TableHead className="text-gray-500 font-normal text-sm">Numéro destinataire</TableHead>
                    <TableHead className="text-gray-500 font-normal text-sm">Agent</TableHead>
                    <TableHead className="text-gray-500 font-normal text-sm">Heure de début</TableHead>
                    <TableHead className="text-gray-500 font-normal text-sm">Type</TableHead>
                    <TableHead className="text-gray-500 font-normal text-sm">Durée</TableHead>
                    <TableHead className="text-gray-500 font-normal text-sm">Coût</TableHead>
                    <TableHead className="text-gray-500 font-normal text-sm">Statut</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCallsExtract.map((call, index) => (
                    <TableRow key={index} className="border-b hover:bg-gray-50">
                      <TableCell className="text-sm text-gray-900">{call.fromNumber}</TableCell>
                      <TableCell className="text-sm text-gray-900">{call.toNumber}</TableCell>
                      <TableCell className="text-sm text-gray-900">{call.agent}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm text-gray-900">{call.startTime}</div>
                          <div className="text-sm text-gray-900">{call.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PhoneIncoming className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-900">{call.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-900">{call.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">{call.cost}</TableCell>
                      <TableCell className="text-sm text-gray-600">{call.status}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-gray-400">
                          ...
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full" onClick={handleOpenCallDetails}>
                Voir tous les appels
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modal des détails des appels */}
        <CallDetailsModal 
          isOpen={isCallDetailsModalOpen}
          onClose={handleCloseCallDetails}
          campaignName={campaign.name}
        />
      </div>
    </div>
  );
};

export default CampaignDetails;
