"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TurmasTable } from '../turmas-table';
import { SearchInput } from '../search';
import { useState } from 'react';

export default function CustomersPage() {
  const [search, setSearch] = useState<string>('');

  // Função para atualizar o termo de pesquisa
  function handleSearch(value: string) {
    setSearch(value);  // Atualiza o termo de pesquisa
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
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
              Adicionar Turma
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <TurmasTable search={search} />  {/* Passa o termo de pesquisa para a TurmasTable */}
      </TabsContent>
    </Tabs>
  );
}
