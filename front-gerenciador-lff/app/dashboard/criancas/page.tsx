"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CriancasTable } from '../criancas-table';
import { SearchInput } from '../search';
import { useEffect, useState } from 'react';

export default function CustomersPage() {
  const [search, setSearch] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('active'); // Adicionando o estado para a aba selecionada

  // Função para atualizar o termo de pesquisa
  function handleSearch(value: string) {
    setSearch(value);  // Atualiza o termo de pesquisa
  }

  function handleTabChange(value: string) {
    setSelectedTab(value);  // Atualiza a aba selecionada
  }

  return (
    <Tabs defaultValue="active" value={selectedTab} onValueChange={handleTabChange}> {/* Controlando a aba selecionada */}
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="draft">Inativos</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <SearchInput onSearchAction={handleSearch} />  {/* Passa a função renomeada */}
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              BAIXAR PDF
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Adicionar Criança
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value={selectedTab}>
        <CriancasTable
          search={search}
          selectTab={selectedTab}
        />
      </TabsContent>
    </Tabs>
  );
}
