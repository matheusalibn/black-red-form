
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import FormField from '@/components/FormField';
import { User, FileText, MapPin } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    dataNascimento: '',
    profissao: '',
    email: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
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
    const requiredFields = ['cpf', 'nome', 'dataNascimento', 'profissao', 'email', 'telefone', 'cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado'];
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

  const handleCepBlur = async () => {
    if (formData.cep.replace(/\D/g, '').length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep.replace(/\D/g, '')}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            endereco: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    id="cpf"
                    label="CPF"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(value) => handleInputChange('cpf', value)}
                    mask="cpf"
                    required
                  />
                  
                  <FormField
                    id="nome"
                    label="Nome Completo"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={(value) => handleInputChange('nome', value)}
                    required
                  />
                  
                  <FormField
                    id="dataNascimento"
                    label="Data de Nascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(value) => handleInputChange('dataNascimento', value)}
                    required
                  />
                  
                  <FormField
                    id="profissao"
                    label="Profissão"
                    placeholder="Digite sua profissão"
                    value={formData.profissao}
                    onChange={(value) => handleInputChange('profissao', value)}
                    required
                  />
                </div>
              </div>

              {/* Contato */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-form-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">@</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Contato</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    id="email"
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    required
                  />
                  
                  <FormField
                    id="telefone"
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(value) => handleInputChange('telefone', value)}
                    mask="phone"
                    required
                  />
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-form-red-500" />
                  <h3 className="text-xl font-semibold text-white">Endereço</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    id="cep"
                    label="CEP"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={(value) => handleInputChange('cep', value)}
                    mask="cep"
                    required
                  />
                  
                  <div className="md:col-span-2">
                    <FormField
                      id="endereco"
                      label="Endereço"
                      placeholder="Rua, Avenida, etc."
                      value={formData.endereco}
                      onChange={(value) => handleInputChange('endereco', value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    id="numero"
                    label="Número"
                    placeholder="123"
                    value={formData.numero}
                    onChange={(value) => handleInputChange('numero', value)}
                    required
                  />
                  
                  <FormField
                    id="complemento"
                    label="Complemento"
                    placeholder="Apto, Bloco, etc."
                    value={formData.complemento}
                    onChange={(value) => handleInputChange('complemento', value)}
                  />
                  
                  <FormField
                    id="bairro"
                    label="Bairro"
                    placeholder="Nome do bairro"
                    value={formData.bairro}
                    onChange={(value) => handleInputChange('bairro', value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    id="cidade"
                    label="Cidade"
                    placeholder="Nome da cidade"
                    value={formData.cidade}
                    onChange={(value) => handleInputChange('cidade', value)}
                    required
                  />
                  
                  <FormField
                    id="estado"
                    label="Estado"
                    placeholder="UF"
                    value={formData.estado}
                    onChange={(value) => handleInputChange('estado', value)}
                    required
                  />
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
