
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

interface InstructionsFormData {
  agentName: string;
  profession: string;
  communicationTone: string;
  companyInfo: string;
  products: string;
  targetAudience: string;
  objectives: string;
  additionalInfo: string;
}

const Instructions = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const { toast } = useToast();
  
  const form = useForm<InstructionsFormData>({
    defaultValues: {
      agentName: '',
      profession: '',
      communicationTone: '',
      companyInfo: '',
      products: '',
      targetAudience: '',
      objectives: '',
      additionalInfo: ''
    }
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const communicationStyles = [
    'Conversationnel', 'Plein d\'esprit', 'Franc', 'Motivant',
    'Génération Z', 'Sceptique', 'Traditionnel', 'Visionnaire', 'Poétique'
  ];

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleSubmit = (data: InstructionsFormData) => {
    console.log('Form data:', data);
    console.log('Selected styles:', selectedStyles);
    
    toast({
      title: "Instructions sauvegardées",
      description: "Les instructions générales ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        currentView="instructions"
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={toggleSidebar} 
          onNewAgent={() => {}}
          currentView="instructions"
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Instructions générales</h1>
              <p className="text-gray-600">Présentez-vous et votre entreprise pour obtenir des réponses plus personnalisées.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                
                {/* Comment l'IA doit-elle s'adresser à vous */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Comment l'IA doit-elle s'adresser à vous ?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="agentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Nom de l'agent ou alias"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Que faites-vous dans la vie */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Que faites-vous dans la vie ?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Votre profession ou secteur d'activité"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Informations sur votre entreprise */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Informations sur votre entreprise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="companyInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez votre entreprise, son secteur d'activité, ses valeurs, son histoire..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Produits et services */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Vos produits et services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="products"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez en détail les produits ou services que vous proposez..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Public cible */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Votre public cible
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="targetAudience"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez votre clientèle cible, leurs besoins, leurs préoccupations..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Ton de communication */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Quel ton ou style l'IA doit-elle adopter ?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">Sélectionnez un ou plusieurs styles :</p>
                      <div className="flex flex-wrap gap-2">
                        {communicationStyles.map((style) => (
                          <Badge
                            key={style}
                            variant={selectedStyles.includes(style) ? "default" : "outline"}
                            className={`cursor-pointer transition-colors ${
                              selectedStyles.includes(style) 
                                ? 'bg-black text-white hover:bg-gray-800' 
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => toggleStyle(style)}
                          >
                            {selectedStyles.includes(style) ? '− ' : '+ '}{style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Objectifs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Vos objectifs commerciaux
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="objectives"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Quels sont vos objectifs ? Vendre, informer, fidéliser, générer des leads..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Informations supplémentaires */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Avez-vous d'autres informations à fournir à l'IA ?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Des centres d'intérêt, des valeurs ou des préférences à prendre en compte..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Boutons d'action */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="px-8"
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-black text-white hover:bg-gray-800 px-8"
                  >
                    Enregistrer
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Instructions;
