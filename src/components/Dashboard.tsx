
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Phone, PhoneOutgoing, PhoneIncoming, Users, Clock, Euro, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const Dashboard = () => {
  // Données simulées pour les graphiques
  const campaignData = [
    { name: 'Lun', outbound: 45, inbound: 23 },
    { name: 'Mar', outbound: 52, inbound: 28 },
    { name: 'Mer', outbound: 38, inbound: 31 },
    { name: 'Jeu', outbound: 67, inbound: 25 },
    { name: 'Ven', outbound: 49, inbound: 37 },
    { name: 'Sam', outbound: 32, inbound: 15 },
    { name: 'Dim', outbound: 28, inbound: 12 }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 1240 },
    { name: 'Fév', revenue: 1680 },
    { name: 'Mar', revenue: 1420 },
    { name: 'Avr', revenue: 1890 },
    { name: 'Mai', revenue: 2150 },
    { name: 'Jun', revenue: 1950 }
  ];

  const statusData = [
    { name: 'Actives', value: 12, color: '#10b981' },
    { name: 'En pause', value: 3, color: '#f59e0b' },
    { name: 'Terminées', value: 8, color: '#6b7280' },
    { name: 'En attente', value: 5, color: '#3b82f6' }
  ];

  const chartConfig = {
    outbound: {
      label: "Appels sortants",
      color: "#3b82f6",
    },
    inbound: {
      label: "Appels entrants", 
      color: "#10b981",
    },
    revenue: {
      label: "Revenus",
      color: "#8b5cf6",
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de vos performances</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campagnes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appels Total</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps d'appel</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42h 15m</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coût Total</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234,50 €</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5%</span> ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des appels par jour */}
        <Card>
          <CardHeader>
            <CardTitle>Appels par jour</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="outbound" fill="var(--color-outbound)" name="Sortants" />
                <Bar dataKey="inbound" fill="var(--color-inbound)" name="Entrants" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Graphique de répartition des statuts */}
        <Card>
          <CardHeader>
            <CardTitle>Statut des campagnes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {statusData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {entry.name} ({entry.value})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique de tendance des revenus */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des coûts</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-revenue)" 
                strokeWidth={2}
                name="Coûts (€)"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Métriques de performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance des agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Taux de réussite</span>
                <span className="text-sm font-semibold text-green-600">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Durée moy. d'appel</span>
                <span className="text-sm font-semibold">3m 45s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Agents actifs</span>
                <span className="text-sm font-semibold">12/15</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Coûts par minute</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Appels sortants</span>
                <span className="text-sm font-semibold">0,12 €/min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Appels entrants</span>
                <span className="text-sm font-semibold">0,08 €/min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Coût moyen</span>
                <span className="text-sm font-semibold text-blue-600">0,10 €/min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Campagne "Support Client" démarrée</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Nouvel agent "Vente Produit" créé</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Campagne "Promo Été" mise en pause</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Rapport mensuel généré</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
