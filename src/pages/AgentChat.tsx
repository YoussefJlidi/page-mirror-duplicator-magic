import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/Sidebar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const AgentChat = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre agent IA. Comment puis-je vous aider aujourd'hui ?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock agent name - in real app, this would come from API
  const agentName = 'Assistant IA Voxama';

  // Suggestions pré-configurées
  const suggestions = [
    "Faire un résumé des campagnes inbound",
    "Faire un résumé des appels outbound", 
    "Réaliser un bilan de tous les appels",
    "Analyser les performances des agents",
    "Générer un rapport d'activité mensuel",
    "Optimiser les scripts d'appels"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simuler une réponse de l'agent après un délai
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse: Message = {
        id: messages.length + 2,
        text: "Je comprends votre demande. Laissez-moi vous aider avec cela.",
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log('Démarrage de l\'enregistrement vocal');
      // Ici, vous pourriez intégrer une API de reconnaissance vocale
    } else {
      console.log('Arrêt de l\'enregistrement vocal');
    }
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      console.log('Activation de la synthèse vocale');
      // Ici, vous pourriez intégrer une API de synthèse vocale
    } else {
      console.log('Désactivation de la synthèse vocale');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        currentView="chat"
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header amélioré */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {agentName}
                  </h1>
                  <p className="text-sm text-gray-500">En ligne • Agent ID: {agentId}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isSpeaking ? "default" : "outline"}
                size="sm"
                onClick={toggleSpeech}
                className="flex items-center space-x-2 transition-all duration-200"
              >
                {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{isSpeaking ? 'Vocal ON' : 'Vocal OFF'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages avec design amélioré */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 animate-fade-in ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gray-100 border border-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-black" />
                  )}
                </div>
                
                {/* Message bubble */}
                <div className={`max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                        : 'bg-white border border-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Indicateur de frappe */}
            {isTyping && (
              <div className="flex items-start space-x-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-200"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Section améliorée */}
          {messages.length <= 1 && (
            <div className="px-6 pb-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Suggestions</h3>
                <p className="text-sm text-gray-600">Cliquez sur une suggestion pour commencer</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="group text-left p-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md hover:border-blue-200 transition-all duration-200 text-sm text-gray-700 hover:text-blue-700"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-600 transition-colors duration-200"></div>
                      <span className="font-medium">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area redesigné */}
          <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none"
                />
                <Button
                  variant={isRecording ? "destructive" : "ghost"}
                  size="icon"
                  onClick={toggleRecording}
                  className={`flex-shrink-0 rounded-full w-8 h-8 ${
                    isRecording ? 'animate-pulse' : ''
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Utilisez le bouton micro pour enregistrer un message vocal ou tapez votre message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;
