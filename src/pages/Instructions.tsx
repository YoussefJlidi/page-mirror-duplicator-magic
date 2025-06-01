
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

interface InstructionsFormData {
  companyData: string;
  productService: string;
  commercialArguments: string;
  pricing: string;
  targetAudience: string;
  communicationTone: string;
  objections: string;
  callObjectives: string;
  companyValues: string;
  competitorAnalysis: string;
  successMetrics: string;
}

const Instructions = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<InstructionsFormData>({
    defaultValues: {
      companyData: '',
      productService: '',
      commercialArguments: '',
      pricing: '',
      targetAudience: '',
      communicationTone: 'professionnel',
      objections: '',
      callObjectives: '',
      companyValues: '',
      competitorAnalysis: '',
      successMetrics: ''
    }
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleStepValidation = (step: number) => {
    const fieldMap = {
      1: 'companyData',
      2: 'productService', 
      3: 'commercialArguments',
      4: 'pricing',
      5: 'targetAudience',
      6: 'communicationTone',
      7: 'objections'
    };
    
    const fieldName = fieldMap[step as keyof typeof fieldMap] as keyof InstructionsFormData;
    const value = form.getValues(fieldName);
    
    if (!value || value.trim() === '') {
      toast({
        title: "Champ requis",
        description: "Veuillez remplir ce champ avant de continuer.",
        variant: "destructive"
      });
      return;
    }

    if (step < 7) {
      setCurrentStep(step + 1);
    } else {
      // Final submission
      toast({
        title: "Instructions sauvegardées",
        description: "Toutes les instructions ont été enregistrées avec succès.",
      });
    }
  };

  const collectCompanyData = () => {
    toast({
      title: "Collecte des données",
      description: "Démarrage de la collecte automatique des données de l'entreprise...",
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
              <p className="text-gray-600">Configurez les instructions relatives à votre entreprise</p>
            </div>

            <Form {...form}>
              <div className="space-y-6">
                {/* Étape 1: Données sur votre entreprise */}
                <Card className={`transition-all ${currentStep >= 1 ? 'border-blue-500' : 'border-gray-200'}`}>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-700">
                      Données sur votre entreprise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="companyData"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Informations sur l'entreprise</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez votre entreprise, son secteur d'activité, ses valeurs, son histoire..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        onClick={collectCompanyData}
                        variant="outline"
                        className="bg-black text-white hover:bg-gray-800 border-black"
                      >
                        Collecter des données
                      </Button>
                      {currentStep === 1 && (
                        <Button 
                          type="button" 
                          onClick={() => handleStepValidation(1)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Valider
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Étape 2: Ce que vous voulez vendre */}
                {currentStep >= 2 && (
                  <Card className={`transition-all ${currentStep >= 2 ? 'border-blue-500' : 'border-gray-200'}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Ce que vous voulez vendre via iapulsion.com
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="productService"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Produits et services</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Décrivez en détail les produits ou services que vous souhaitez promouvoir..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {currentStep === 2 && (
                        <Button 
                          type="button" 
                          onClick={() => handleStepValidation(2)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Valider
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Étape 3: Arguments commerciaux */}
                {currentStep >= 3 && (
                  <Card className={`transition-all ${currentStep >= 3 ? 'border-blue-500' : 'border-gray-200'}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Arguments commerciaux
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="commercialArguments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Arguments de vente</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Listez vos principaux arguments de vente, avantages concurrentiels, points forts..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {currentStep === 3 && (
                        <Button 
                          type="button" 
                          onClick={() => handleStepValidation(3)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Valider
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Étape 4: Prix */}
                {currentStep >= 4 && (
                  <Card className={`transition-all ${currentStep >= 4 ? 'border-blue-500' : 'border-gray-200'}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Prix
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="pricing"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stratégie tarifaire</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Décrivez votre grille tarifaire, les offres spéciales, les conditions de prix..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {currentStep === 4 && (
                        <Button 
                          type="button" 
                          onClick={() => handleStepValidation(4)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Valider
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Étape 5: Public cible */}
                {currentStep >= 5 && (
                  <Card className={`transition-all ${currentStep >= 5 ? 'border-blue-500' : 'border-gray-200'}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Public cible
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description du public cible</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Décrivez votre public cible : démographie, besoins, comportements d'achat..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {currentStep === 5 && (
                        <Button 
                          type="button" 
                          onClick={() => handleStepValidation(5)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Valider
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Étape 6: Ton de communication */}
                {currentStep >= 6 && (
                  <Card className={`transition-all ${currentStep >= 6 ? 'border-blue-500' : 'border-gray-200'}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Ton de communication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="communicationTone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Style de communication à adopter</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="professionnel" id="professionnel" />
                                  <label htmlFor="professionnel" className="text-sm font-medium">Professionnel et formel</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="amical" id="amical" />
                                  <label htmlFor="amical" className="text-sm font-medium">Amical et décontracté</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="expert" id="expert" />
                                  <label htmlFor="expert" className="text-sm font-medium">Expert et technique</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="enthousiaste" id="enthousiaste" />
                                  <label htmlFor="enthousiaste" className="text-sm font-medium">Enthousiaste et dynamique</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {currentStep === 6 && (
                        <Button 
                          type="button" 
                          onClick={() => handleStepValidation(6)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Valider
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Étape 7: Gestion des objections */}
                {currentStep >= 7 && (
                  <Card className={`transition-all ${currentStep >= 7 ? 'border-blue-500' : 'border-gray-200'}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Gestion des objections
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="objections"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objections courantes et réponses</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Listez les objections fréquentes et les réponses recommandées pour les agents..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="callObjectives"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objectifs d'appel</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Définissez les objectifs principaux de chaque appel (prise de rendez-vous, vente directe, qualification...)..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyValues"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valeurs de l'entreprise</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Décrivez les valeurs importantes à transmettre durant les appels..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="competitorAnalysis"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Analyse concurrentielle</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Informations sur la concurrence et comment vous différencier..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="successMetrics"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Critères de succès</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Définissez ce qui constitue un appel réussi et les KPIs à suivre..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {currentStep === 7 && (
                        <Button 
                          type="button" 
                          onClick={() => handleStepValidation(7)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Finaliser les instructions
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Instructions;
