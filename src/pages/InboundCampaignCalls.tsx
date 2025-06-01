
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Clock, Users, TrendingUp, PhoneCall, PhoneIncoming } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const InboundCampaignCalls = () => {
  const { campaignId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Données de synthèse pour la campagne entrante
  const campaignSummary = {
    totalCalls: 15,
    totalMinutes: 8.3,
    averageDuration: '33s',
    activeCallers: 2,
    missedCalls: 1
  };

  // Données détaillées des appels entrants
  const inboundCalls = [
    {
      fromNumber: '+33 6 12 34 56 78',
      toNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      startTime: '15/01',
      time: '14:25',
      type: 'entrant',
      duration: '1\'23',
      cost: '€ 0.15',
      status: 'terminé'
    },
    {
      fromNumber: '+33 6 98 76 54 32',
      toNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      startTime: '15/01',
      time: '13:45',
      type: 'entrant',
      duration: '0\'45',
      cost: '€ 0.08',
      status: 'terminé'
    },
    {
      fromNumber: '+33 7 11 22 33 44',
      toNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      startTime: '15/01',
      time: '12:30',
      type: 'entrant',
      duration: '2\'15',
      cost: '€ 0.22',
      status: 'terminé'
    },
    {
      fromNumber: '+33 6 55 66 77 88',
      toNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      startTime: '15/01',
      time: '11:15',
      type: 'entrant',
      duration: '0\'00',
      cost: '€ 0.00',
      status: 'manqué'
    },
    {
      fromNumber: '+33 6 33 44 55 66',
      toNumber: '+33 1 23 45 67 89',
      agent: 'Support Client',
      startTime: '15/01',
      time: '10:20',
      type: 'entrant',
      duration: '1\'05',
      cost: '€ 0.12',
      status: 'terminé'
    }
  ];

  const filters = [
    { label: 'Agent', active: false },
    { label: 'Campagne', active: false },
    { label: 'Heure de début', active: true },
    { label: 'Numéro émetteur', active: false },
    { label: 'Numéro destinataire', active: false },
    { label: 'Durée', active: false },
    { label: 'Status', active: false }
  ];

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
              <Link to="/inbound-calls">
                <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <PhoneIncoming className="h-8 w-8 text-black" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appels entrants - Support Client</h1>
              </div>
            </div>

            {/* Synthèse des statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card className="bg-white border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <PhoneCall className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Total des appels</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{campaignSummary.totalCalls}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Total des minutes</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{campaignSummary.totalMinutes}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <span className="text-sm text-gray-600">Durée moyenne</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{campaignSummary.averageDuration}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span className="text-sm text-gray-600">Appelants actifs</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{campaignSummary.activeCallers}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    <span className="text-sm text-gray-600">Appels manqués</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{campaignSummary.missedCalls}</p>
                </CardContent>
              </Card>
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((filter, index) => (
                <Button
                  key={index}
                  variant={filter.active ? "default" : "outline"}
                  size="sm"
                  className="text-sm bg-white border"
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Tableau détaillé des appels */}
            <Card className="bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">Détails des appels entrants</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="text-gray-600 font-medium">Numéro émetteur</TableHead>
                        <TableHead className="text-gray-600 font-medium">Numéro destinataire</TableHead>
                        <TableHead className="text-gray-600 font-medium">Agent</TableHead>
                        <TableHead className="text-gray-600 font-medium">Heure de début</TableHead>
                        <TableHead className="text-gray-600 font-medium">Type</TableHead>
                        <TableHead className="text-gray-600 font-medium">Durée</TableHead>
                        <TableHead className="text-gray-600 font-medium">Coût</TableHead>
                        <TableHead className="text-gray-600 font-medium">Statut</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inboundCalls.map((call, index) => (
                        <TableRow key={index} className="border-b hover:bg-gray-50">
                          <TableCell className="font-mono text-sm text-gray-900">{call.fromNumber}</TableCell>
                          <TableCell className="font-mono text-sm text-gray-900">{call.toNumber}</TableCell>
                          <TableCell className="text-sm text-gray-900">{call.agent}</TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm text-gray-900">{call.startTime}</div>
                              <div className="text-sm text-gray-900">{call.time}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <PhoneIncoming className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-900">{call.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${call.status === 'terminé' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span className="text-sm font-medium text-gray-900">{call.duration}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">{call.cost}</TableCell>
                          <TableCell>
                            <Badge variant={call.status === 'terminé' ? 'default' : 'destructive'}>
                              {call.status}
                            </Badge>
                          </TableCell>
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
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InboundCampaignCalls;
