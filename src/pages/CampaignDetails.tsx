import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Clock, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, RotateCcw, FileText, Edit, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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

  // Données simulées pour le classement
  const topPerformances = [
    { rank: 1, contact: "Marie Dubois", duration: "8m 30s", outcome: "Commande validée", score: 95 },
    { rank: 2, contact: "Jean Martin", duration: "6m 15s", outcome: "RDV pris", score: 90 },
    { rank: 3, contact: "Sophie Laurent", duration: "7m 45s", outcome: "Devis demandé", score: 88 },
    { rank: 4, contact: "Pierre Dupont", duration: "5m 20s", outcome: "Rappel programmé", score: 85 },
    { rank: 5, contact: "Claire Moreau", duration: "9m 10s", outcome: "Commande validée", score: 82 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:bg-gray-200">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
            <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{campaign.agent}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{campaign.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{campaign.duration}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              campaign.status === 'active' ? 'bg-green-100 text-green-800' :
              campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              campaign.status === 'paused' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {statusLabels[campaign.status]}
            </span>
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

        {/* Section principale avec 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colonne gauche - Métriques */}
          <div className="space-y-6">
            {/* Taux de réussite */}
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

            {/* Progression */}
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
          </div>

          {/* Colonne droite - Classement des meilleures performances */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Meilleurs appels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPerformances.map((performance) => (
                  <div key={performance.rank} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full font-bold text-sm">
                      {performance.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{performance.contact}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {performance.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {performance.score}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">{performance.outcome}</span>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Plus de détails
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions et Informations */}
            <div className="space-y-6">
              {/* Actions */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full flex items-center gap-2" size="sm">
                    <AlertCircle className="h-4 w-4" />
                    Plus de détails
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2" size="sm">
                    <FileText className="h-4 w-4" />
                    Télécharger le rapport PDF
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2" size="sm">
                    <Edit className="h-4 w-4" />
                    Modifier la campagne
                  </Button>
                </CardContent>
              </Card>

              {/* Informations */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
