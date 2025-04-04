"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from 'react';
import { getAllTurmas } from '@/lib/db';
import { ChamadaTable } from '../chamada-table';
import { Input } from "@/components/ui/input";
import { data } from 'autoprefixer';

export default function ChamadaPage() {
  const [turmas, setTurmas] = useState<{ id: string; nome: string }[]>([]);
  const [idTurma, setIdTurma] = useState<string>('');
  const [dataChamada, setDataChamada] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  }); const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    const fetchTurmas = async () => {
      let { turmas } = await getAllTurmas();
      setTurmas(turmas);
    };

    fetchTurmas();
  }, []);

  const [erro, setErro] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novaData = e.target.value;
    const hoje = new Date().toISOString().split("T")[0];

    if (novaData > hoje) {
      setErro("A data não pode ser maior que a atual.");
    } else {
      setErro("");
      setDataChamada(novaData);
    }
  };

  return (
    <Tabs defaultValue="active" value="all">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Data da Chamada</label>
          <Input type="date" value={dataChamada} onChange={handleChange} />
          {erro && <p className="text-red-500 text-sm mt-1">{erro}</p>}

        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Turma</label>
          <Select onValueChange={(value) => { setIdTurma(value) }}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Selecione uma turma" />
            </SelectTrigger>
            <SelectContent>
              {turmas.map((turma) => (
                <SelectItem key={turma.id} value={turma.id}>
                  {turma.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <hr />
        </div>
      </div>

      <TabsContent value="all">
        {idTurma !== '' ? (
          <ChamadaTable idTurma={idTurma} dataChamada={dataChamada} nomeTurma={turmas.find(turma => turma.id == idTurma)?.nome || ''} />
        ) : null}
      </TabsContent>
    </Tabs>
  );
}
