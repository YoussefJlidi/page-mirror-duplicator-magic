import React, { useState } from 'react';
import { Phone, Plus, PhoneCall, Clock, CheckCircle, PauseCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CallSession {
  id: number;
  name: string;
  phoneNumber: string;
  duration: string;
  status: 'active' | 'completed' | 'paused';
  startTime: string;
}

const initialCallSessions: CallSession[] = [
  {
    id: 1,
    name: 'Session Client A',
    phoneNumber: '+33 1 23 45 67 89',
    duration: '12m 30s',
    status: 'active',
    startTime: '14:30'
  },
  {
    id: 2,
    name: 'Appel Support',
    phoneNumber: '+33 1 98 76 54 32',
    duration: '8m 15s',
    status: 'completed',
    startTime: '13:45'
  },
  {
    id: 3,
    name: 'Consultation Technique',
    phoneNumber: '+33 1 55 44 33 22',
    duration: '25m 10s',
    status: 'paused',
    startTime: '12:15'
  }
];

const HumanCalls = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [callSessions, setCallSessions] = useState(initialCallSessions);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNewCall = () => {
    console.log('Nouvel appel');
    // Logique pour créer un nouvel appel
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'paused':
        return 'En pause';
      default:
        return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <PhoneCall className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'paused':
        return <PauseCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        currentView="human"
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onNewAgent={handleNewCall}
          currentView="human"
        />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Espace d'appel humain</h1>
                <p className="text-gray-600">Passez vos appels directement via la plateforme</p>
              </div>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Nouvel appel
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Appels actifs</CardTitle>
                <PhoneCall className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {callSessions.filter(session => session.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">En cours maintenant</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Appels terminés</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {callSessions.filter(session => session.status === 'completed').length}
                </div>
                <p className="text-xs text-muted-foreground">Aujourd'hui</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temps total</CardTitle>
                <Clock className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45m 55s</div>
                <p className="text-xs text-muted-foreground">Durée cumulée</p>
              </CardContent>
            </Card>
          </div>

          {/* Call Sessions */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Vos sessions d'appel</h2>
              <p className="text-sm text-gray-600">Gérez vos appels en cours et historique</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {callSessions.map((session) => (
                <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{session.name}</h3>
                        <p className="text-sm text-gray-500">{session.phoneNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{session.duration}</p>
                        <p className="text-xs text-gray-500">Début: {session.startTime}</p>
                      </div>
                      
                      <Badge className={getStatusColor(session.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(session.status)}
                          <span>{getStatusLabel(session.status)}</span>
                        </div>
                      </Badge>
                      
                      <div className="flex space-x-2">
                        {session.status === 'active' && (
                          <Button size="sm" variant="outline" className="text-yellow-600">
                            <PauseCircle className="w-4 h-4 mr-1" />
                            Pause
                          </Button>
                        )}
                        {session.status === 'paused' && (
                          <Button size="sm" variant="outline" className="text-green-600">
                            <PhoneCall className="w-4 h-4 mr-1" />
                            Reprendre
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Détails
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HumanCalls;
