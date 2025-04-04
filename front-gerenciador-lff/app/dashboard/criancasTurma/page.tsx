"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CriancasTurmaTable } from '../criancas-turma-table';
import { SearchInput } from '../search';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllEscolas, getAllTurmas, salvarCrianca } from '@/lib/db'; // Importa o método que retorna as escolas

export default function CustomersPage() {
    const [search, setSearch] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<string>('active'); // Adicionando o estado para a aba selecionada
    const [loadPage, setLoadPage] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        dataNascimento: '',
        turma: { id: '', nome: '' },
        escola: { id: '', nome: '' },
        nomeResponsavel: '',
        contatoResponsavel: '',
        status: '',
        cadastroAtivo: true,
        dataCadastro: '',
        ultimaAtualizacao: ''
    });

    const [open, setOpen] = useState(false);

    const [escolas, setEscolas] = useState<{ id: string; nome: string }[]>([]); // Definindo o tipo diretamente no useState
    const [turmas, setTurmas] = useState<{ id: string; nome: string }[]>([]); // Definindo o tipo diretamente no useState

    const [idTurma, setIdTurma] = useState<string>('');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        let id = queryParams.get("idTurma") ?? '';
        setIdTurma(id);
        if (id) {
            setLoadPage(true);
        }
    }, []);


    useEffect(() => {
        const fetchEscolas = async () => {
            let { escolas } = await getAllEscolas();
            setEscolas(escolas); // Armazena as escolas no estado
        };
        const fetchTurmas = async () => {
            let { turmas } = await getAllTurmas();
            setTurmas(turmas); // Armazena as escolas no estado
        };

        fetchTurmas();
        fetchEscolas();
    }, []);

    // Função para atualizar o termo de pesquisa
    function handleSearch(value: string) {
        setSearch(value);  // Atualiza o termo de pesquisa
    }

    function handleTabChange(value: string) {
        setSelectedTab(value);  // Atualiza a aba selecionada
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: any, field: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses em torno dos primeiros dois dígitos
        value = value.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quinto e o sexto dígitos
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        salvarCrianca(formData);
        setOpen(false);
    };


    return (
        <Tabs defaultValue="active" value={selectedTab} onValueChange={handleTabChange}> {/* Controlando a aba selecionada */}
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="active">Ativos</TabsTrigger>
                    <TabsTrigger value="draft">Inativos</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            BAIXAR PDF
                        </span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1" onClick={() => setOpen(true)}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Adicionar Criança
                        </span>
                    </Button>
                </div>
            </div>
            <div className='mt-3'>
                <SearchInput onSearchAction={handleSearch} />  {/* Passa a função renomeada */}
            </div>
            <TabsContent value={selectedTab}>
                {loadPage ? (
                    <CriancasTurmaTable
                        search={search}
                        selectTab={selectedTab}
                        idTurma={idTurma}
                        nomeTurma={turmas.find(turma => turma.id == idTurma)?.nome.toUpperCase() || ''} // Corrigido aqui
                    />
                ) : null}

            </TabsContent>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto scroll-form">
                    <DialogHeader>
                        <DialogTitle>Cadastrar Criança</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div>
                            <Label>Nome</Label>
                            <Input name="nome" value={formData.nome} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Data de Nascimento</Label>
                            <Input
                                name="dataNascimento"
                                type="date" // Define o tipo como 'date'
                                value={formData.dataNascimento ? formData.dataNascimento.substring(0, 10) : ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Turma</Label>
                            <Select
                                name="turma"
                                value={formData.turma ? String(formData.turma.id) : ""}
                                onValueChange={(value) => {
                                    const turmaSelecionada = turmas.find((turma) => String(turma.id) === value);
                                    handleSelectChange(turmaSelecionada || null, "turma"); // Salva o objeto completo
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione a turma" />
                                </SelectTrigger>
                                <SelectContent>
                                    {turmas.map((turma) => (
                                        <SelectItem key={turma.id} value={String(turma.id)}>
                                            {turma.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Escola</Label>
                            <Select
                                name="escola"
                                value={formData.escola ? String(formData.escola.id) : ""}
                                onValueChange={(value) => {
                                    const escolaSelecionada = escolas.find((escola) => String(escola.id) === value);
                                    handleSelectChange(escolaSelecionada || null, "escola"); // Salva o objeto completo
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione a escola" />
                                </SelectTrigger>
                                <SelectContent>
                                    {escolas.map((escola) => (
                                        <SelectItem key={escola.id} value={String(escola.id)}>
                                            {escola.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Responsável</Label>
                            <Input name="nomeResponsavel" value={formData.nomeResponsavel} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Contato Responsável</Label>
                            <Input name="contatoResponsavel" value={formData.contatoResponsavel} onChange={handleTelefoneChange} maxLength={15} />
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Input name="status" value={formData.status} onChange={handleChange} />
                        </div>

                        <div>
                            <Label>Habilitado</Label>
                            <Select
                                name="cadastroAtivo"
                                value={formData.cadastroAtivo ? "true" : "false"}
                                onValueChange={(value) => setFormData({ ...formData, cadastroAtivo: value === "true" })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Sim</SelectItem>
                                    <SelectItem value="false">Não</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                            <Button onClick={handleSave}>Salvar</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </Tabs>
    );
}
