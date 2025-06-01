
import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Square, Play } from 'lucide-react';

interface AgentTestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
}

const AgentTestDialog: React.FC<AgentTestDialogProps> = ({
  isOpen,
  onClose,
  agentName
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'agent';
    message: string;
    timestamp: Date;
  }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // Ici, on simule la transcription et la réponse de l'agent
        simulateAgentResponse();
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setCurrentMessage('Écoute en cours...');
    } catch (error) {
      console.error('Erreur d\'accès au microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setCurrentMessage('Traitement en cours...');
    }
  };

  const simulateAgentResponse = () => {
    // Simulation d'une transcription utilisateur
    const userMessage = "Bonjour, pouvez-vous m'aider ?";
    setConversation(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }]);

    // Simulation de la réponse de l'agent après un délai
    setTimeout(() => {
      const agentMessage = `Bonjour ! Je suis ${agentName}, votre assistant IA. Je suis ravi de pouvoir vous aider aujourd'hui. Que puis-je faire pour vous ?`;
      setConversation(prev => [...prev, {
        type: 'agent',
        message: agentMessage,
        timestamp: new Date()
      }]);
      setCurrentMessage('');
      
      // Simulation de la lecture de la réponse
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    }, 1500);
  };

  const clearConversation = () => {
    setConversation([]);
    setCurrentMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  Test vocal - {agentName}
                </DialogTitle>
                <p className="text-sm text-gray-500">
                  Testez votre agent en conversation vocale
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              En test
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          {/* Zone de conversation */}
          <div className="bg-gray-50 rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
            {conversation.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Mic className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>Cliquez sur le micro pour commencer la conversation</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversation.map((item, index) => (
                  <div
                    key={index}
                    className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        item.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{item.message}</p>
                      <p className={`text-xs mt-1 ${
                        item.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {item.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {currentMessage && (
              <div className="flex justify-start mt-3">
                <div className="bg-white border border-gray-200 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">{currentMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Contrôles de l'agent */}
          <div className="flex items-center justify-center space-x-4">
            {isPlaying && (
              <div className="flex items-center gap-2 text-green-600">
                <Play className="w-4 h-4" />
                <span className="text-sm">Agent en train de parler...</span>
              </div>
            )}
          </div>

          {/* Micro avec animation */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {/* Cercles d'animation pour l'enregistrement */}
              {isRecording && (
                <>
                  <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30"></div>
                  <div className="absolute inset-2 rounded-full bg-red-300 animate-ping opacity-40 animation-delay-200"></div>
                  <div className="absolute inset-4 rounded-full bg-red-200 animate-ping opacity-50 animation-delay-400"></div>
                </>
              )}
              
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isPlaying}
                className={`relative w-20 h-20 rounded-full text-white text-lg font-semibold transition-all duration-200 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 scale-110'
                    : 'bg-blue-500 hover:bg-blue-600'
                } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRecording ? (
                  <Square className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                {isRecording ? 'Enregistrement en cours...' : 'Cliquez pour parler'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isRecording ? 'Cliquez pour arrêter' : 'Maintenez une conversation naturelle'}
              </p>
            </div>
          </div>

          {/* Boutons d'actions */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={clearConversation}
              disabled={conversation.length === 0}
            >
              Effacer la conversation
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
              <Button 
                className="bg-black hover:bg-gray-800 text-white"
                onClick={onClose}
              >
                Terminer le test
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentTestDialog;
