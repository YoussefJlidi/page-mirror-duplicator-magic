
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Clock, Users, MoreVertical } from 'lucide-react';

interface CampaignCardProps {
  id: number;
  name: string;
  status: 'pending' | 'active' | 'finished' | 'paused';
  calls: number;
  duration: string;
  agent: string;
  phoneNumber: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  finished: 'bg-gray-100 text-gray-800',
  paused: 'bg-orange-100 text-orange-800'
};

const statusLabels = {
  pending: 'En attente',
  active: 'Actif',
  finished: 'Terminé',
  paused: 'En pause'
};

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  name,
  status,
  calls,
  duration,
  agent,
  phoneNumber
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          <span>{phoneNumber}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>{agent}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-1" />
            <span>{calls} appels</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex space-x-2">
          {status === 'pending' && (
            <Button size="sm" className="flex-1">
              Démarrer
            </Button>
          )}
          {status === 'active' && (
            <Button size="sm" variant="outline" className="flex-1">
              Mettre en pause
            </Button>
          )}
          {status === 'paused' && (
            <Button size="sm" className="flex-1">
              Reprendre
            </Button>
          )}
          <Link to={`/campaign/${id}`}>
            <Button size="sm" variant="outline">
              Voir détails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
