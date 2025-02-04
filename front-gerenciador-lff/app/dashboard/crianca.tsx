import { useState, useEffect } from 'react';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteProduct } from './actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { getAllEscolas, getAllTurmas, salvarCrianca, deletarCrianca } from '@/lib/db'; // Importa o método que retorna as escolas
import PopUpExclusao from "@/components/popup-exclusao";

export function Crianca({ crianca }: { crianca: any }) {
    const [open, setOpen] = useState(false);
    const [viewMode, setViewMode] = useState(false);  // Estado para controlar o modo de visualização ou edição

    const [formData, setFormData] = useState({
        id: crianca.id,
        nome: crianca.nome,
        dataNascimento: crianca.dataNascimento,
        turma: crianca.turma,
        escola: crianca.escola,
        nomeResponsavel: crianca.nomeResponsavel,
        contatoResponsavel: crianca.contatoResponsavel,
        status: crianca.status,
        cadastroAtivo: crianca.cadastroAtivo,
        dataCadastro: crianca.dataCadastro,
        ultimaAtualizacao: crianca.ultimaAtualizacao
    });

    const [copiaForm, setCopiaForm] = useState<typeof formData | null>(null);

    const [escolas, setEscolas] = useState<{ id: string; nome: string }[]>([]); // Definindo o tipo diretamente no useState
    const [turmas, setTurmas] = useState<{ id: string; nome: string }[]>([]); // Definindo o tipo diretamente no useState

    const [showConfirm, setShowConfirm] = useState(false);

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

    useEffect(() => {
        if (!open) {
            setViewMode(false);
            if (copiaForm) {
                setFormData(copiaForm);
            }
        } else {
            setCopiaForm((prev) => ({ ...formData }));
        }
    }, [open]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: any, field: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        salvarCrianca(formData);
        setOpen(false);
        setCopiaForm(null);
    };

    const handleVisualizar = () => {
        setViewMode(true);  // Muda para o modo visualização
        setOpen(true);
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses em torno dos primeiros dois dígitos
        value = value.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quinto e o sexto dígitos
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleConfirmDelete = () => {
        setShowConfirm(false);
    };

    const handleClosePopup = () => {
        setShowConfirm(false);
    };

    const handleDelete = () => {
        deletarCrianca(crianca.id);
        handleClosePopup();
    };


    return (
        <TableRow>
            <TableCell className="font-medium">{crianca.nome}</TableCell>
            <TableCell>
                <Badge variant="outline" className="capitalize">
                    {crianca.escola.nome}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{crianca.turma.nome}</TableCell>
            <TableCell className="hidden md:table-cell">{crianca.nomeResponsavel}</TableCell>
            <TableCell className="hidden md:table-cell">{crianca.contatoResponsavel}</TableCell>

            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleVisualizar()}>Visualizar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpen(true)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowConfirm(true)}>
                            <button type="submit">Deletar</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto scroll-form">
                    <DialogHeader>
                        <DialogTitle>{viewMode ? 'Visualizar Criança' : 'Editar Criança'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div>
                            <Label>Nome</Label>
                            <Input name="nome" value={formData.nome} onChange={handleChange} disabled={viewMode} />
                        </div>
                        <div>
                            <Label>Data de Nascimento</Label>
                            <Input
                                name="dataNascimento"
                                type="date" // Define o tipo como 'date'
                                value={formData.dataNascimento ? formData.dataNascimento.substring(0, 10) : ""}
                                onChange={handleChange}
                                disabled={viewMode}
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
                                disabled={viewMode}
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
                                disabled={viewMode}
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
                            <Input name="nomeResponsavel" value={formData.nomeResponsavel} onChange={handleChange} disabled={viewMode} />
                        </div>
                        <div>
                            <Label>Contato Responsável</Label>
                            <Input name="contatoResponsavel" value={formData.contatoResponsavel} onChange={handleTelefoneChange} maxLength={15} disabled={viewMode} />
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Input name="status" value={formData.status} onChange={handleChange} disabled={viewMode} />
                        </div>3
                        {viewMode ? (
                            <div>
                                <div>
                                    <Label>Data de Cadastro</Label>
                                    <Input
                                        name="dataCadastro"
                                        value={formData.dataCadastro ? new Date(formData.dataCadastro + 'T00:00:00').toLocaleDateString('pt-BR') : ""}
                                        disabled={viewMode}
                                    />
                                </div>
                                <div>
                                    <Label>Ultima Atualização</Label>
                                    <Input
                                        name="ultimaAtualizacao"
                                        value={formData.ultimaAtualizacao ? new Date(formData.ultimaAtualizacao + 'T00:00:00').toLocaleDateString('pt-BR') : ""}
                                        disabled={viewMode}
                                    />
                                </div>
                            </div>
                        ) : null}
                        <div>
                            <Label>Habilitado</Label>
                            <Select
                                name="cadastroAtivo"
                                value={formData.cadastroAtivo ? "true" : "false"}
                                onValueChange={(value) => setFormData({ ...formData, cadastroAtivo: value === "true" })} disabled={viewMode}
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
                            <Button variant="outline" onClick={() => { setOpen(false), setViewMode(false) }}>{viewMode ? 'Fechar' : 'Cancelar'}</Button>
                            {!viewMode && <Button onClick={handleSave}>Salvar</Button>}  {/* Oculta o botão "Salvar" no modo de visualização */}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {showConfirm && (
                <PopUpExclusao
                    titulo="Confirmação de Exclusão"
                    mensagem={`Tem certeza que deseja excluir a criança ${crianca.nome} ?`}
                    action={handleDelete}
                    fecharModal={handleClosePopup}
                />
            )}


        </TableRow>
    );
}
