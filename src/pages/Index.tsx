
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import FormField from '@/components/FormField';
import { User, FileText } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    estadoCivil: '',
    genero: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    const requiredFields = ['nome', 'dataNascimento', 'cpf', 'estadoCivil', 'genero'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Simular envio
    console.log('Dados do formulário:', formData);
    toast({
      title: "Formulário enviado!",
      description: "Seus dados foram enviados com sucesso.",
      className: "bg-green-800 text-white border-green-600"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-form-red-600 rounded-full">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Formulário de Cadastro
            </CardTitle>
            <p className="text-gray-400">
              Preencha todos os campos abaixo para completar seu cadastro
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados Pessoais */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-form-red-500" />
                  <h3 className="text-xl font-semibold text-white">Dados Pessoais</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    id="nome"
                    label="Nome Completo"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={(value) => handleInputChange('nome', value)}
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      id="dataNascimento"
                      label="Data de Nascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(value) => handleInputChange('dataNascimento', value)}
                      required
                    />
                    
                    <FormField
                      id="cpf"
                      label="CPF"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(value) => handleInputChange('cpf', value)}
                      mask="cpf"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="estadoCivil" className="text-sm font-medium text-white flex items-center gap-1">
                        Estado Civil
                        <span className="text-form-red-500">*</span>
                      </label>
                      <select
                        id="estadoCivil"
                        value={formData.estadoCivil}
                        onChange={(e) => handleInputChange('estadoCivil', e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-400 focus:border-form-red-500 focus:ring-form-red-500 focus:outline-none transition-all duration-200 hover:border-gray-600"
                      >
                        <option value="">Selecione seu estado civil</option>
                        <option value="solteiro">Solteiro(a)</option>
                        <option value="casado">Casado(a)</option>
                        <option value="divorciado">Divorciado(a)</option>
                        <option value="viuvo">Viúvo(a)</option>
                        <option value="separado">Separado(a)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="genero" className="text-sm font-medium text-white flex items-center gap-1">
                        Gênero
                        <span className="text-form-red-500">*</span>
                      </label>
                      <select
                        id="genero"
                        value={formData.genero}
                        onChange={(e) => handleInputChange('genero', e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-400 focus:border-form-red-500 focus:ring-form-red-500 focus:outline-none transition-all duration-200 hover:border-gray-600"
                      >
                        <option value="">Selecione seu gênero</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="nao-binario">Não-binário</option>
                        <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão de envio */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  className="bg-form-red-600 hover:bg-form-red-700 text-white px-12 py-3 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-form-red-500/25"
                >
                  Enviar Formulário
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
