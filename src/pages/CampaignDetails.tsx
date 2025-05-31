
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Clock, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
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

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistiques principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Métriques principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Appels réussis</p>
                      <p className="text-2xl font-bold text-green-900">{stats.successful}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Appels échoués</p>
                      <p className="text-2xl font-bold text-red-900">{stats.failed}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">À appeler</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.toCall}</p>
                    </div>
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">À relancer</p>
                      <p className="text-2xl font-bold text-orange-900">{stats.toRetry}</p>
                    </div>
                    <RotateCcw className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Graphiques de progression */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Taux de réussite
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{successRate}%</div>
                      <p className="text-sm text-gray-600">des appels connectés</p>
                    </div>
                    <Progress value={successRate} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{stats.successful} réussis</span>
                      <span>{stats.failed} échoués</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    Progression
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{completionRate}%</div>
                      <p className="text-sm text-gray-600">de la campagne</p>
                    </div>
                    <Progress value={completionRate} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{stats.successful + stats.failed} traités</span>
                      <span>{stats.total} total</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions et informations */}
          <div className="space-y-6">
            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {campaign.status === 'pending' && (
                  <Button className="w-full" size="lg">
                    Démarrer la campagne
                  </Button>
                )}
                {campaign.status === 'active' && (
                  <Button variant="outline" className="w-full" size="lg">
                    Mettre en pause
                  </Button>
                )}
                {campaign.status === 'paused' && (
                  <Button className="w-full" size="lg">
                    Reprendre
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Télécharger rapport CSV
                </Button>
                <Button variant="outline" className="w-full">
                  Modifier la campagne
                </Button>
              </CardContent>
            </Card>

            {/* Détails de la campagne */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Agent IA</h4>
                  <p className="text-sm text-gray-600">{campaign.agent}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Numéro de téléphone</h4>
                  <p className="text-sm text-gray-600">{campaign.phoneNumber}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Durée totale</h4>
                  <p className="text-sm text-gray-600">{campaign.duration}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Prospects total</h4>
                  <p className="text-sm text-gray-600">{stats.total}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tableau de bord détaillé */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Répartition des appels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-900">{stats.successful}</div>
                <div className="text-sm text-green-700">Appels réussis</div>
                <div className="text-xs text-green-600 mt-1">
                  {Math.round((stats.successful / stats.total) * 100)}% du total
                </div>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-900">{stats.toCall}</div>
                <div className="text-sm text-blue-700">À appeler</div>
                <div className="text-xs text-blue-600 mt-1">
                  {Math.round((stats.toCall / stats.total) * 100)}% restant
                </div>
              </div>

              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <RotateCcw className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-orange-900">{stats.toRetry}</div>
                <div className="text-sm text-orange-700">À relancer</div>
                <div className="text-xs text-orange-600 mt-1">
                  {Math.round((stats.toRetry / stats.total) * 100)}% à reprendre
                </div>
              </div>

              <div className="text-center p-6 bg-red-50 rounded-lg">
                <XCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-red-900">{stats.failed}</div>
                <div className="text-sm text-red-700">Appels échoués</div>
                <div className="text-xs text-red-600 mt-1">
                  {Math.round((stats.failed / stats.total) * 100)}% d'échec
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetails;
