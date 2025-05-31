
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Clock, Users, TrendingUp, PhoneCall, PhoneIncoming } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const CallDetails = () => {
  const { campaignId } = useParams();

  // Données des statistiques correspondant à l'image
  const callStats = {
    totalCalls: 23,
    totalMinutes: 9.6,
    averageDuration: '25s',
    callerCount: 3,
    calleeCount: 1
  };

  // Données détaillées des appels selon l'image
  const detailedCalls = [
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
    },
    {
      fromNumber: '+33 6 50 76 71 18',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '11:00',
      type: 'entrant',
      duration: '0\'22',
      cost: '€ 0.06',
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
    { label: 'Variable', active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/campaign/${campaignId}`}>
            <Button variant="ghost" size="icon" className="hover:bg-gray-200">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Appels</h1>
        </div>

        {/* Statistiques en haut - style cards avec icônes */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="bg-white border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <PhoneCall className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Total des appels</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{callStats.totalCalls}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Total des minutes</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{callStats.totalMinutes}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Durée moyenne</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{callStats.averageDuration}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Nombre d'appelants</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{callStats.callerCount}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <PhoneIncoming className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Nombre d'appelés</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{callStats.calleeCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres - style boutons horizontaux */}
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
            <CardTitle className="text-xl font-semibold text-gray-900">Détails des appels</CardTitle>
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
                  {detailedCalls.map((call, index) => (
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
                          <PhoneIncoming className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-900">{call.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900">{call.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">{call.cost}</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{call.status}</span>
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
    </div>
  );
};

export default CallDetails;
