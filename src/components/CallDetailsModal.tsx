import React, { useState } from 'react';
import { X, Phone, Clock, Users, TrendingUp, PhoneCall, PhoneIncoming, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
}

const CallDetailsModal: React.FC<CallDetailsModalProps> = ({ isOpen, onClose, campaignName }) => {
  const [playingCallIndex, setPlayingCallIndex] = useState<number | null>(null);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Détails des appels - {campaignName}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
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

          {/* Tableau détaillé des appels avec police plus petite */}
          <Card className="bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Détails des appels</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="text-gray-600 font-medium text-xs">Numéro émetteur</TableHead>
                      <TableHead className="text-gray-600 font-medium text-xs">Numéro destinataire</TableHead>
                      <TableHead className="text-gray-600 font-medium text-xs">Agent</TableHead>
                      <TableHead className="text-gray-600 font-medium text-xs">Heure de début</TableHead>
                      <TableHead className="text-gray-600 font-medium text-xs">Type</TableHead>
                      <TableHead className="text-gray-600 font-medium text-xs">Durée</TableHead>
                      <TableHead className="text-gray-600 font-medium text-xs">Coût</TableHead>
                      <TableHead className="text-gray-600 font-medium text-xs">Statut</TableHead>
                      <TableHead className="text-gray-600 font-medium text-xs">Écouter l'appel</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailedCalls.map((call, index) => (
                      <TableRow key={index} className="border-b hover:bg-gray-50">
                        <TableCell className="font-mono text-xs text-gray-900 px-2 py-2 whitespace-nowrap">{call.fromNumber}</TableCell>
                        <TableCell className="font-mono text-xs text-gray-900 px-2 py-2 whitespace-nowrap">{call.toNumber}</TableCell>
                        <TableCell className="text-xs text-gray-900 px-2 py-2 whitespace-nowrap">{call.agent}</TableCell>
                        <TableCell className="px-2 py-2">
                          <div className="text-xs text-gray-900 whitespace-nowrap">
                            {call.startTime} {call.time}
                          </div>
                        </TableCell>
                        <TableCell className="px-2 py-2">
                          <div className="flex items-center gap-1">
                            <PhoneIncoming className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-900">{call.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-2 py-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-900">{call.duration}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-gray-900 px-2 py-2 whitespace-nowrap">{call.cost}</TableCell>
                        <TableCell className="px-2 py-2">
                          <span className="text-xs text-gray-600">{call.status}</span>
                        </TableCell>
                        <TableCell className="text-center px-2 py-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`p-1 rounded-full ${playingCallIndex === index ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => handlePlayCall(index)}
                          >
                            <Play className={`h-3 w-3 ${playingCallIndex === index ? 'animate-pulse' : ''}`} />
                          </Button>
                        </TableCell>
                        <TableCell className="px-2 py-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 text-xs">
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
    </div>
  );
};

export default CallDetailsModal;
