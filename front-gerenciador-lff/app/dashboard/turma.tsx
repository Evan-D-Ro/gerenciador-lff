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
import { Menu } from 'lucide-react';
import { useRouter } from "next/navigation";

export function Turma({ turma }: { turma: any }) {

    const router = useRouter();

    const handleRedirect = () => {
        router.push(`/dashboard/criancasTurma?idTurma=${turma.id}`);
    };

    return (
        <TableRow>
            <TableCell className="font-medium">
                <button onClick={handleRedirect} className="text-blue-500 hover:underline">
                    {turma.nome}
                </button>
            </TableCell>
            <TableCell>
                <Badge variant="outline" className="capitalize">
                    {turma.visibilidade ? 'Ativa' : 'Desativada'}
                </Badge>
            </TableCell>
            {/* <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell> */}

            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>
                            <form action={deleteProduct}>
                                <button type="submit">Deletar</button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
