import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Clock, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, RotateCcw, FileText, Edit, PhoneIncoming, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCallDetailsModalOpen, setIsCallDetailsModalOpen] = useState(false);
  const [playingCallIndex, setPlayingCallIndex] = useState<number | null>(null);
  const campaign = initialCampaigns.find(c => c.id === parseInt(campaignId || '1'));
  
  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onViewChange={() => {}}
          currentView="call"
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header 
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
            onNewAgent={() => {}}
            currentView="call"
          />
          <main className="flex-1 p-6">
            <div>Campagne non trouvée</div>
          </main>
        </div>
      </div>
    );
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
4 duration: '0\'16',
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

  const handlePlayCall = (index: number) => {
    if (playingCallIndex === index) {
      setPlayingCallIndex(null);
      console.log(`Arrêt de la lecture de l'appel ${index + 1}`);
    } else {
      setPlayingCallIndex(index);
      console.log(`Lecture de l'appel ${index + 1}`);
      // Simuler l'arrêt automatique après quelques secondes
      setTimeout(() => {
        setPlayingCallIndex(null);
      }, 3000);
    }
  };

  const handleOpenCallDetails = () => {
    setIsCallDetailsModalOpen(true);
  };

  const handleCloseCallDetails = () => {
    setIsCallDetailsModalOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onViewChange={() => {}}
        currentView="call"
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onNewAgent={() => {}}
          currentView="call"
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{campaign.name}</h1>
            </div>

            {/* Section en haut avec informations agent et actions - 2 lignes responsive */}
            <div className="bg-white rounded-lg border p-4 sm:p-6 mb-6">
              {/* Première ligne - Informations de l'agent */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{campaign.agent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{campaign.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{campaign.duration}</span>
                </div>
              </div>
              
              {/* Deuxième ligne - Actions avec boutons noirs */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Button 
                  className="bg-black text-white hover:bg-gray-800 text-xs sm:text-sm px-3 py-2"
                  size="sm" 
                  onClick={handleOpenCallDetails}
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Plus de détails
                </Button>
                <Button 
                  className="bg-black text-white hover:bg-gray-800 text-xs sm:text-sm px-3 py-2"
                  size="sm"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Télécharger le rapport PDF
                </Button>
                <Button 
                  className="bg-black text-white hover:bg-gray-800 text-xs sm:text-sm px-3 py-2"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier la campagne
                </Button>
              </div>
            </div>

            {/* Statistiques principales - Toutes avec la même couleur grise */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Appels réussis</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.successful}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Appels échoués</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.failed}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">À appeler</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.toCall}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <RotateCcw className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">À relancer</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.toRetry}</p>
                </CardContent>
              </Card>
            </div>

            {/* Section principale avec 3 colonnes - Stack on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne 1 - Taux de réussite */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                    Taux de réussite
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{successRate}%</div>
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
                    <AlertCircle className="h-5 w-5 text-gray-600" />
                    Progression
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{completionRate}%</div>
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
                    <p className="text-sm text-gray-600 break-words">{campaign.agent}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Numéro de téléphone</h4>
                    <p className="text-sm text-gray-600 break-words">{campaign.phoneNumber}</p>
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

            {/* Section Top appels - Tableau responsive avec bouton play */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Top appels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left text-gray-500 font-medium">Date/Heure</TableHead>
                        <TableHead className="text-left text-gray-500 font-medium">Numéro appelant</TableHead>
                        <TableHead className="text-left text-gray-500 font-medium">Numéro appelé</TableHead>
                        <TableHead className="text-left text-gray-500 font-medium">Agent</TableHead>
                        <TableHead className="text-center text-gray-500 font-medium">Durée</TableHead>
                        <TableHead className="text-center text-gray-500 font-medium">Coût</TableHead>
                        <TableHead className="text-center text-gray-500 font-medium">Écouter l'appel</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topCallsExtract.map((call, index) => (
                        <TableRow key={index} className="border-b">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                              <span className="text-xs font-medium text-gray-900">{call.startTime} - {call.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-900">{call.fromNumber}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-900">{call.toNumber}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-900">{call.agent}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-xs font-medium text-gray-900">{call.duration}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-xs text-gray-900">{call.cost}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`p-2 rounded-full ${playingCallIndex === index ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
                              onClick={() => handlePlayCall(index)}
                            >
                              <Play className={`h-4 w-4 ${playingCallIndex === index ? 'animate-pulse' : ''}`} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Bouton voir tous les appels */}
                <div className="mt-6 text-center">
                  <Button 
                    className="bg-black text-white hover:bg-gray-800 px-6 py-2"
                    onClick={handleOpenCallDetails}
                  >
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
        </main>
      </div>
    </div>
  );
};

export default CampaignDetails;
