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
import { getPermissoesUser } from '@/lib/db';


export function Pessoa({ pessoa }: { pessoa: any }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nome: pessoa.nome,
        contato: pessoa.contato,
        cargo: pessoa.cargo,
        usuario: pessoa.usuario,
        habilitado: pessoa.habilitado,
    });

    const [permissoes, setPermissoes] = useState<{
        viewPessoa: boolean;
        cadastrarPessoa: boolean;
        editarPessoa: boolean;
        excluirPessoa: boolean;
        obterPessoas: boolean;

        viewCrianca: boolean;
        cadastrarCrianca: boolean;
        editarCrianca: boolean;
        excluirCrianca: boolean;
        obterCriancas: boolean;

        viewEscola: boolean;
        cadastrarEscola: boolean;
        editarEscola: boolean;
        excluirEscola: boolean;
        obterEscolas: boolean;

        viewTurma: boolean;
        cadastrarTurma: boolean;
        editarTurma: boolean;
        excluirTurma: boolean;
        obterTurmas: boolean;

        viewChamada: boolean;
        cadastrarChamada: boolean;
        editarChamada: boolean;
        excluirChamada: boolean;
        obterChamadas: boolean;

        viewRelatorios: boolean;
        editarPermissoes: boolean;
    }>({
        viewPessoa: false,
        cadastrarPessoa: false,
        editarPessoa: false,
        excluirPessoa: false,
        obterPessoas: false,
        viewCrianca: false,
        cadastrarCrianca: false,
        editarCrianca: false,
        excluirCrianca: false,
        obterCriancas: false,
        viewEscola: false,
        cadastrarEscola: false,
        editarEscola: false,
        excluirEscola: false,
        obterEscolas: false,
        viewTurma: false,
        cadastrarTurma: false,
        editarTurma: false,
        excluirTurma: false,
        obterTurmas: false,
        viewChamada: false,
        cadastrarChamada: false,
        editarChamada: false,
        excluirChamada: false,
        obterChamadas: false,
        viewRelatorios: false,
        editarPermissoes: false
    });

    async function fetchPermissoes() {
        try {
            let permissoes = await getPermissoesUser(pessoa.usuario);
            setPermissoes(permissoes);
        } catch (error) {
            console.error('Erro ao buscar permissoes:', error);
        }
    }

    useEffect(() => {
        fetchPermissoes();
    }, []);

    const handleEdit = () => {
        fetchPermissoes();
        setOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        if (name === "viewPessoa") {
            // Se 'viewPessoa' for alterado, marca ou desmarca todas as permissões
            setPermissoes(prevPermissoes => ({
                ...prevPermissoes,
                viewPessoa: checked,
                cadastrarPessoa: checked,
                editarPessoa: checked,
                excluirPessoa: checked,
                obterPessoas: checked,
            }));
        } else {
            // Se qualquer outra permissão for alterada, também marca o 'viewPessoa'
            setPermissoes(prevPermissoes => ({
                ...prevPermissoes,
                [name]: checked,
                // Se qualquer outra permissão for marcada, marca 'viewPessoa'
                viewPessoa: checked ? true : prevPermissoes.viewPessoa,
            }));
        }
    };


    const handleSave = () => {
        console.log('Dados salvos:', formData);
        setOpen(false);
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{pessoa.nome}</TableCell>
            <TableCell>
                <Badge variant="outline" className="capitalize">{pessoa.contato}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{pessoa.cargo}</TableCell>
            <TableCell className="hidden md:table-cell">{pessoa.usuario}</TableCell>
            <TableCell className="hidden md:table-cell">{pessoa.habilitado ? 'Ativo' : 'Desativado'}</TableCell>

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
                        <DropdownMenuItem>Visualizar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit()}>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Resetar Senha</DropdownMenuItem>
                        <DropdownMenuItem>
                            <form action={deleteProduct}>
                                <button type="submit">Deletar</button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>

            {/* Modal de Edição */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto scroll-form">
                    <DialogHeader>
                        <DialogTitle>Editar Pessoa</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div>
                            <Label>Nome</Label>
                            <Input name="nome" value={formData.nome} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Contato</Label>
                            <Input name="contato" value={formData.contato} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Cargo</Label>
                            <Input name="cargo" value={formData.cargo} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Usuário</Label>
                            <Input name="usuario" value={formData.usuario} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Habilitado</Label>
                            <Select
                                name="habilitado"
                                value={formData.habilitado ? "true" : "false"}
                                onValueChange={(value) => setFormData({ ...formData, habilitado: value === "true" })}
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
                        <div>
                            <Label>PERMISSÕES</Label>
                            <div className="space-y-2 mt-2">

                                {/* Checkbox Controlador (viewPessoa) */}
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        name="viewPessoa"
                                        checked={permissoes.viewPessoa}
                                        onChange={handlePermissionChange}
                                        className="w-4 h-4 bg-blue-500 checked:bg-blue-700 text-white rounded-full shadow-lg"

                                    />
                                    <Label className="font-bold">Configurações</Label>
                                </div>
                                {permissoes.viewPessoa ? (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="cadastrarPessoa"
                                                checked={permissoes.cadastrarPessoa}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Cadastrar Pessoa</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="editarPessoa"
                                                checked={permissoes.editarPessoa}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Editar Pessoa</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="excluirPessoa"
                                                checked={permissoes.excluirPessoa}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Excluir Pessoa</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="obterPessoas"
                                                checked={permissoes.obterPessoas}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Obter Pessoas</Label>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        name="viewCrianca"
                                        checked={permissoes.viewCrianca}
                                        onChange={handlePermissionChange}
                                        className="w-4 h-4 bg-blue-500 checked:bg-blue-700 text-white rounded-full shadow-lg"

                                    />
                                    <Label className="font-bold">Crianças</Label>
                                </div>
                                {permissoes.viewCrianca ? (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="cadastrarCrianca"
                                                checked={permissoes.cadastrarCrianca}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Cadastrar Criança</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="editarCrianca"
                                                checked={permissoes.editarCrianca}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Editar Criança</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="excluirCrianca"
                                                checked={permissoes.excluirCrianca}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Excluir Criança</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="obterCriancas"
                                                checked={permissoes.obterCriancas}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Obter Crianças</Label>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        name="viewEscola"
                                        checked={permissoes.viewEscola}
                                        onChange={handlePermissionChange}
                                        className="w-4 h-4 bg-blue-500 checked:bg-blue-700 text-white rounded-full shadow-lg"

                                    />
                                    <Label className="font-bold">Escolas</Label>
                                </div>
                                {permissoes.viewEscola ? (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="cadastrarEscola"
                                                checked={permissoes.cadastrarEscola}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Cadastrar Escola</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="editarEscola"
                                                checked={permissoes.editarEscola}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Editar Escola</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="excluirEscola"
                                                checked={permissoes.excluirEscola}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Excluir Escola</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="obterEscolas"
                                                checked={permissoes.obterEscolas}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Obter Escolas</Label>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        name="viewTurma"
                                        checked={permissoes.viewTurma}
                                        onChange={handlePermissionChange}
                                        className="w-4 h-4 bg-blue-500 checked:bg-blue-700 text-white rounded-full shadow-lg"

                                    />
                                    <Label className="font-bold">Turmas</Label>
                                </div>
                                {permissoes.viewTurma ? (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="cadastrarTurma"
                                                checked={permissoes.cadastrarTurma}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Cadastrar Turma</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="editarTurma"
                                                checked={permissoes.editarTurma}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Editar Turma</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="excluirTurma"
                                                checked={permissoes.excluirTurma}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Excluir Turma</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="obterTurmas"
                                                checked={permissoes.obterTurmas}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Obter Turmas</Label>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        name="viewChamada"
                                        checked={permissoes.viewChamada}
                                        onChange={handlePermissionChange}
                                        className="w-4 h-4 bg-blue-500 checked:bg-blue-700 text-white rounded-full shadow-lg"

                                    />
                                    <Label className="font-bold">Chamada</Label>
                                </div>
                                {permissoes.viewChamada ? (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="cadastrarChamada"
                                                checked={permissoes.cadastrarChamada}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Cadastrar Chamada</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="editarChamada"
                                                checked={permissoes.editarChamada}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Editar Chamada</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="excluirChamada"
                                                checked={permissoes.excluirChamada}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Excluir Chamada</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2 pl-4">
                                            <input
                                                type="checkbox"
                                                name="obterChamadas"
                                                checked={permissoes.obterChamadas}
                                                onChange={handlePermissionChange}
                                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500 focus:ring-2 focus:ring-gray-300"
                                            />
                                            <Label>Obter Chamadas</Label>
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                            <Button onClick={handleSave}>Salvar</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </TableRow>
    );
}