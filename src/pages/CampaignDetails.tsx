
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Clock, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, RotateCcw, FileText, Edit, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

  // Données simulées pour les statistiques
  const stats = {
    total: 500,
    successful: 180,
    failed: 95,
    toCall: 160,
    toRetry: 65
  };

  const successRate = Math.round((stats.successful / (stats.successful + stats.failed)) * 100);
  const completionRate = Math.round(((stats.successful + stats.failed) / stats.total) * 100);

  // Données simulées pour le tableau détaillé des appels
  const callDetails = [
    { 
      rank: 1, 
      contact: "Marie Dubois", 
      phone: "+33 1 45 67 89 01",
      duration: "8m 30s", 
      quality: 95, 
      outcome: "Commande validée", 
      comments: "Client très satisfait, commande de 250€",
      timestamp: "14:30"
    },
    { 
      rank: 2, 
      contact: "Jean Martin", 
      phone: "+33 1 23 45 67 89",
      duration: "6m 15s", 
      quality: 90, 
      outcome: "RDV pris", 
      comments: "Rendez-vous fixé pour demain 10h",
      timestamp: "14:25"
    },
    { 
      rank: 3, 
      contact: "Sophie Laurent", 
      phone: "+33 1 98 76 54 32",
      duration: "7m 45s", 
      quality: 88, 
      outcome: "Devis demandé", 
      comments: "Intéressée par nos services premium",
      timestamp: "14:20"
    },
    { 
      rank: 4, 
      contact: "Pierre Dupont", 
      phone: "+33 1 11 22 33 44",
      duration: "5m 20s", 
      quality: 85, 
      outcome: "Rappel programmé", 
      comments: "Pas disponible, rappel vendredi matin",
      timestamp: "14:15"
    },
    { 
      rank: 5, 
      contact: "Claire Moreau", 
      phone: "+33 1 55 66 77 88",
      duration: "9m 10s", 
      quality: 82, 
      outcome: "Commande validée", 
      comments: "Hésitante au début mais convaincue",
      timestamp: "14:10"
    },
    { 
      rank: 6, 
      contact: "Michel Bernard", 
      phone: "+33 1 77 88 99 00",
      duration: "3m 45s", 
      quality: 78, 
      outcome: "Pas intéressé", 
      comments: "Déjà équipé chez un concurrent",
      timestamp: "14:05"
    },
    { 
      rank: 7, 
      contact: "Anne Petit", 
      phone: "+33 1 66 55 44 33",
      duration: "11m 30s", 
      quality: 92, 
      outcome: "Information envoyée", 
      comments: "Demande documentation par email",
      timestamp: "14:00"
    }
  ];

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return "text-green-600";
    if (quality >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getOutcomeColor = (outcome: string) => {
    if (outcome.includes("Commande") || outcome.includes("RDV")) return "text-green-600";
    if (outcome.includes("Devis") || outcome.includes("Information")) return "text-blue-600";
    if (outcome.includes("Rappel")) return "text-orange-600";
    return "text-red-600";
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
              <Link to={`/campaign/${campaignId}/calls`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Plus de détails
                </Button>
              </Link>
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

        {/* Section Détails des appels */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Détails des appels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rang</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Qualité</TableHead>
                    <TableHead>Résultat</TableHead>
                    <TableHead>Commentaires</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {callDetails.map((call) => (
                    <TableRow key={call.rank}>
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full font-bold text-sm">
                          {call.rank}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{call.contact}</TableCell>
                      <TableCell className="text-sm text-gray-600">{call.phone}</TableCell>
                      <TableCell className="text-sm text-gray-600">{call.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{call.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-gray-400" />
                          <span className={`text-sm font-medium ${getQualityColor(call.quality)}`}>
                            {call.quality}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${getOutcomeColor(call.outcome)}`}>
                          {call.outcome}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {call.comments}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                Voir tous les appels
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetails;
