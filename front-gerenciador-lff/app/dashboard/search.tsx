'use client';

import { useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/icons';
import { Search } from 'lucide-react';

interface SearchInputProps {
    onSearchAction: (value: string) => void;  // Alterado o nome para "onSearchAction"
}

export function SearchInput({ onSearchAction }: SearchInputProps) {
    const [isPending, startTransition] = useTransition();

    function searchAction(formData: FormData) {
        let value = formData.get('q') as string;
        onSearchAction(value);  // Usa o "onSearchAction" no lugar de "onSearch"
    }

    return (
        <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
            <Input
                name="q"
                type="search"
                placeholder="Buscar..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
            {isPending && <Spinner />}
        </form>
    );
}
