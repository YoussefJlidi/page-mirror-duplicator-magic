
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Clock, Users, TrendingUp, PhoneCall, PhoneIncoming } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const CallDetails = () => {
  const { campaignId } = useParams();

  // Données des statistiques détaillées
  const callStats = {
    totalCalls: 23,
    totalMinutes: 9.6,
    averageDuration: '25s',
    callerCount: 3,
    calleeCount: 1
  };

  // Données détaillées des appels avec plus d'informations
  const detailedCalls = [
    {
      fromNumber: '+33 6 46 67 36 34',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '13/04',
      time: '14:34',
      type: 'inbound',
      duration: '0\'11',
      cost: '€ 0.03',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 46 67 36 34',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '19:20',
      type: 'inbound',
      duration: '0\'43',
      cost: '€ 0.11',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 46 67 36 34',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '19:05',
      type: 'inbound',
      duration: '0\'24',
      cost: '€ 0.06',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 35 48 51 72',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '19:05',
      type: 'inbound',
      duration: '0\'16',
      cost: '€ 0.04',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 50 76 71 18',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '11:01',
      type: 'inbound',
      duration: '0\'49',
      cost: '€ 0.13',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 50 76 71 18',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '11:00',
      type: 'inbound',
      duration: '0\'22',
      cost: '€ 0.06',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 50 76 71 18',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '11/04',
      time: '10:59',
      type: 'inbound',
      duration: '0\'51',
      cost: '€ 0.14',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 46 67 36 34',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '10/04',
      time: '23:56',
      type: 'inbound',
      duration: '0\'43',
      cost: '€ 0.12',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 50 76 71 18',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '10/04',
      time: '22:56',
      type: 'inbound',
      duration: '2\'13',
      cost: '€ 0.35',
      status: 'completed'
    },
    {
      fromNumber: '+33 6 50 76 71 18',
      toNumber: '+33 9 74 99 66 73',
      agent: '101 conseils',
      startTime: '10/04',
      time: '22:46',
      type: 'inbound',
      duration: '0\'06',
      cost: '€ 0.02',
      status: 'completed'
    }
  ];

  const filters = [
    { label: 'Agent', active: false },
    { label: 'Campagne', active: false },
    { label: 'Heure de début', active: false },
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

        {/* Statistiques en haut */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <PhoneCall className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Total des appels</span>
              </div>
              <p className="text-2xl font-bold">{callStats.totalCalls}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Total des minutes</span>
              </div>
              <p className="text-2xl font-bold">{callStats.totalMinutes}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Durée moyenne</span>
              </div>
              <p className="text-2xl font-bold">{callStats.averageDuration}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Nombre d'appelants</span>
              </div>
              <p className="text-2xl font-bold">{callStats.callerCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <PhoneIncoming className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Nombre d'appelés</span>
              </div>
              <p className="text-2xl font-bold">{callStats.calleeCount}</p>
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
              className="text-sm"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Tableau détaillé des appels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Détails des appels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Numéro émetteur</TableHead>
                    <TableHead>Numéro destinataire</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Heure de début</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Coût</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedCalls.map((call, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{call.fromNumber}</TableCell>
                      <TableCell className="font-mono text-sm">{call.toNumber}</TableCell>
                      <TableCell>{call.agent}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{call.startTime}</div>
                          <div className="text-sm font-medium">{call.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <PhoneIncoming className="h-3 w-3" />
                          <span className="text-sm">entrant</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">{call.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{call.cost}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          terminé
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          ...
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" size="sm">
                Précédent
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallDetails;
