import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PhoneIncoming, Clock, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, RotateCcw, Play, Phone, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const InboundCalls = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [playingCallIndex, setPlayingCallIndex] = useState<number | null>(null);

  // Données simulées pour les appels entrants
  const inboundStats = {
    totalReceived: 156,
    answered: 134,
    missed: 22,
    averageWaitTime: '12s',
    averageDuration: '3m 24s'
  };

  const answerRate = Math.round((inboundStats.answered / inboundStats.totalReceived) * 100);

  // Appels entrants récents
  const recentInboundCalls = [
    {
      callerNumber: '+33 6 12 34 56 78',
      receivedNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      time: '14:23',
      date: '15/04',
      duration: '2\'45',
      status: 'answered',
      reason: 'Information produit'
    },
    {
      callerNumber: '+33 6 87 65 43 21',
      receivedNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      time: '14:18',
      date: '15/04',
      duration: '1\'32',
      status: 'answered',
      reason: 'Commande'
    },
    {
      callerNumber: '+33 6 55 44 33 22',
      receivedNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      time: '14:12',
      date: '15/04',
      duration: '0\'00',
      status: 'missed',
      reason: 'Non répondu'
    },
    {
      callerNumber: '+33 6 99 88 77 66',
      receivedNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      time: '14:05',
      date: '15/04',
      duration: '4\'18',
      status: 'answered',
      reason: 'Support technique'
    },
    {
      callerNumber: '+33 6 11 22 33 44',
      receivedNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      time: '13:58',
      date: '15/04',
      duration: '2\'03',
      status: 'answered',
      reason: 'Réclamation'
    }
  ];

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

  const handlePlayCall = (index: number) => {
    if (playingCallIndex === index) {
      setPlayingCallIndex(null);
      console.log(`Arrêt de la lecture de l'appel ${index + 1}`);
    } else {
      setPlayingCallIndex(index);
      console.log(`Lecture de l'appel ${index + 1}`);
      setTimeout(() => {
        setPlayingCallIndex(null);
      }, 3000);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
                <PhoneIncoming className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Recevoir un appel</h1>
              </div>
            </div>

            {/* Bouton Configurer des appels */}
            <div className="flex justify-end mb-6">
              <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurer des appels
              </Button>
            </div>

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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
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

            {/* Statistiques principales */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <PhoneIncoming className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-blue-700 mb-1">Total reçus</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-900">{inboundStats.totalReceived}</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-green-700 mb-1">Répondus</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-900">{inboundStats.answered}</p>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-red-700 mb-1">Manqués</p>
                  <p className="text-2xl sm:text-3xl font-bold text-red-900">{inboundStats.missed}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Attente moy.</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{inboundStats.averageWaitTime}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Durée moy.</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{inboundStats.averageDuration}</p>
                </CardContent>
              </Card>
            </div>

            {/* Section avec 2 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Taux de réponse */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Taux de réponse
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{answerRate}%</div>
                  <p className="text-sm text-gray-600 mb-4">des appels répondus</p>
                  <Progress value={answerRate} className="h-3 mb-4" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{inboundStats.answered} répondus</span>
                    <span>{inboundStats.missed} manqués</span>
                  </div>
                </CardContent>
              </Card>

              {/* Configuration actuelle */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Agent actuel</h4>
                    <p className="text-sm text-gray-600">Support Client</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Numéro de réception</h4>
                    <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Heures d'ouverture</h4>
                    <p className="text-sm text-gray-600">09:00 - 18:00</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Statut</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Actif</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions rapides */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Modifier la configuration
                  </Button>
                  <Button variant="outline" className="w-full">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Voir les rapports détaillés
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Rappeler les appels manqués
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Tableau des appels récents */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Appels entrants récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left text-gray-500 font-medium">Date/Heure</TableHead>
                        <TableHead className="text-left text-gray-500 font-medium">Appelant</TableHead>
                        <TableHead className="text-left text-gray-500 font-medium">Numéro reçu</TableHead>
                        <TableHead className="text-left text-gray-500 font-medium">Agent</TableHead>
                        <TableHead className="text-center text-gray-500 font-medium">Statut</TableHead>
                        <TableHead className="text-center text-gray-500 font-medium">Durée</TableHead>
                        <TableHead className="text-left text-gray-500 font-medium">Motif</TableHead>
                        <TableHead className="text-center text-gray-500 font-medium">Écouter</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentInboundCalls.map((call, index) => (
                        <TableRow key={index} className="border-b">
                          <TableCell>
                            <span className="text-xs text-gray-900">{call.date} - {call.time}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-900">{call.callerNumber}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-900">{call.receivedNumber}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-900">{call.agent}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${call.status === 'answered' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span className={`text-xs ${call.status === 'answered' ? 'text-green-600' : 'text-red-600'}`}>
                                {call.status === 'answered' ? 'Répondu' : 'Manqué'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-xs font-medium text-gray-900">{call.duration}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-600">{call.reason}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            {call.status === 'answered' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className={`p-2 rounded-full ${playingCallIndex === index ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => handlePlayCall(index)}
                              >
                                <Play className={`h-4 w-4 ${playingCallIndex === index ? 'animate-pulse' : ''}`} />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InboundCalls;
