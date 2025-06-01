
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

interface InstructionsFormData {
  companyData: string;
  productService: string;
  commercialArguments: string;
  pricing: string;
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
      pricing: ''
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
      4: 'pricing'
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

    if (step < 4) {
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
                      Données sur votre entreprises
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
                        className="bg-gray-600 text-white hover:bg-gray-700"
                      >
                        Collecter des données
                      </Button>
                      {currentStep === 1 && (
                        <Button 
                          type="button" 
                          onClick={() => handleStepValidation(1)}
                          className="bg-gray-600 text-white hover:bg-gray-700"
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
                          className="bg-gray-600 text-white hover:bg-gray-700"
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
                          className="bg-gray-600 text-white hover:bg-gray-700"
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
                          className="bg-gray-600 text-white hover:bg-gray-700"
                        >
                          Valider
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
