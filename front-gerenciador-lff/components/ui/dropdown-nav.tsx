'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function DropdownNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="relative flex items-center gap-4 px-4 py-3 bg-gray-800">
            {/* Botão para abrir o dropdown */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={clsx(
                            'flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-md',
                            {
                                'bg-accent text-black': isOpen // Altere a classe se o dropdown estiver aberto
                            }
                        )}
                    >
                        <span>Relatórios</span>
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right">                    <ul>
                    <li className="px-4 py-2">
                        <Link href="#" className="text-gray-700 hover:text-gray-900">Relatório 1</Link>
                    </li>
                    <li className="px-4 py-2">
                        <Link href="#" className="text-gray-700 hover:text-gray-900">Relatório 2</Link>
                    </li>
                    <li className="px-4 py-2">
                        <Link href="#" className="text-gray-700 hover:text-gray-900">Relatório 3</Link>
                    </li>
                </ul></TooltipContent>
            </Tooltip>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-md w-48">
                    <ul>
                        <li className="px-4 py-2">
                            <Link href="#" className="text-gray-700 hover:text-gray-900">Relatório 1</Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link href="#" className="text-gray-700 hover:text-gray-900">Relatório 2</Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link href="#" className="text-gray-700 hover:text-gray-900">Relatório 3</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
