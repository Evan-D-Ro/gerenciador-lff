"use client"

import Link from 'next/link';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  UserCheck,
  School,
  ClipboardMinus

} from 'lucide-react';


import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import Providers from './providers';
import { NavItem } from './nav-item';
import { DropdownNav } from '@/components/ui/dropdown-nav';

import { ColorMode } from './color-mode';
import { useEffect, useState } from 'react';
import { getPermissoes } from '@/lib/db';


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const [permissoes, setPermissoes] = useState<any[]>([]);

  async function fetchPermissoes() {
    try {
      const permissoes = await getPermissoes();
      setPermissoes(permissoes);
    } catch (error) {
      console.error('Erro ao buscar permissoes:', error);
    }
  }

  useEffect(() => {
    fetchPermissoes();
  }, []);

  return (
    <Providers>
      {permissoes ? (
        <main className="flex min-h-screen w-full flex-col bg-muted/40">
          <DesktopNav permissoes={permissoes} />
          <div className="flex flex-col sm:gap-0 sm:pt-4 sm:pl-48">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-14 sm:border-0 sm:bg-transparent sm:px-6 sm:pb-4" style={{ borderBottom: '1px solid gray' }}>
              <h2 className="text-2xl font-bold text-center text-primary tracking-wide hidden sm:block">
                LAR FRANCISCO FRANCO - "CASA DAS MENINAS"</h2>
              <MobileNav permissoes={permissoes} />
              <ColorMode />
              <User />
            </header>
            <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-6 md:gap-4 bg-muted/40">
              {children}
            </main>
          </div>
          <Analytics />
        </main>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p>Carregando permissões...</p>
        </div>
      )}
    </Providers>
  );
}

function DesktopNav({ permissoes }: any) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-48 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5" style={{ paddingBottom: '0px !important' }}>

        <Link
          href="#"
          className="flex h-25 w-25 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-25 md:w-25"
        >
          <div className="flex items-center justify-center border-4 border-grey-300 p-2">
            <img src="/logo-lar.png" alt="Logo" className="h-32 w-32 object-contain" />
          </div>
        </Link>
        <hr className='mt-2' style={{ border: '1px solid grey', width: '90%' }} />
      </nav>

      <nav className="flex flex-col items-start gap-4 px-2 sm:py-5">

        <Link
          href="/dashboard"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          INÍCIO
        </Link>

        {permissoes?.viewEscola ? (<Link
          href={permissoes?.viewEscola ? "/dashboard/escolas" : "#"}
          className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${!permissoes?.viewEscola ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
            }`}
          aria-disabled={!permissoes?.viewEscola}
        >
          <School className="h-5 w-5" />
          ESCOLAS
        </Link>
        ) : null}

        {permissoes?.viewTurma ? (
          <Link
            href="/dashboard/turmas"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            TURMAS
          </Link>
        ) : null}

        {permissoes?.viewCrianca ? (
          <Link
            href="/dashboard/criancas"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <UserCheck className="h-5 w-5" />
            CRIANÇAS
          </Link>
        ) : null}

        {permissoes?.viewChamada ? (
          <Link
            href="/dashboard/chamada"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ClipboardMinus className="h-5 w-5" />
            CHAMADA
          </Link>
        ) : null}

        <Tooltip delayDuration={200}>  {/* 200ms de atraso */}
          <TooltipTrigger asChild>
            {permissoes?.viewRelatorios ? (

              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                <span className="">RELATÓRIOS</span>
              </Link>
            ) : null}

          </TooltipTrigger>
          <TooltipContent side="bottom">
            <ul>
              <li className="px-4 py-2">
                <Link href="#" className="text-gray-700 hover:text-gray-900">ANIVERSÁRIOS NO MÊS</Link>
              </li>
              <li className="px-4 py-2">
                <Link href="#" className="text-gray-700 hover:text-gray-900">FALTAS</Link>
              </li>
              <li className="px-4 py-2">
                <Link href="#" className="text-gray-700 hover:text-gray-900">ALUNOS POR ESCOLA</Link>
              </li>
            </ul></TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            {permissoes?.viewPessoa ? (

              <Link
                href="/dashboard/admin"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
                <span className="">CONFIGURAÇÕES</span>
              </Link>
            ) : null}
          </TooltipTrigger>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav({ permissoes }: any) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className='grid gap-6 text-lg font-medium mb-4 mt-0'>

          <Link
            href="#"
            className="flex h-25 w-25 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-25 md:w-25"
          >
            <div className="flex items-center justify-center bg-white border-4 border-grey-300 p-2">
              <img src="/logo-lar.png" alt="Logo" className="h-32 w-32 object-contain" />
            </div>          <span className="sr-only"></span>
          </Link>
          <hr style={{ border: '1px solid grey', width: '100%' }} />
        </nav>

        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            INÍCIO
          </Link>
          <Link
            href="/dashboard/escolas"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <School className="h-5 w-5" />
            ESCOLAS
          </Link>
          <Link
            href="/dashboard/turmas"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            TURMAS
          </Link>
          <Link
            href="/dashboard/criancas"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <UserCheck className="h-5 w-5" />
            CRIANÇAS
          </Link>
          <Link
            href="/dashboard/chamada"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ClipboardMinus className="h-5 w-5" />
            CHAMADA
          </Link>
          <Tooltip delayDuration={200}>  {/* 200ms de atraso */}
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                <span className="">RELATÓRIOS</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="down">
              <ul>
                <li className="px-4 py-2">
                  <Link href="#" className="text-gray-700 hover:text-gray-900">ANIVERSÁRIOS NO MÊS</Link>
                </li>
                <li className="px-4 py-2">
                  <Link href="#" className="text-gray-700 hover:text-gray-900">FALTAS</Link>
                </li>
                <li className="px-4 py-2">
                  <Link href="#" className="text-gray-700 hover:text-gray-900">ALUNOS POR ESCOLA</Link>
                </li>
              </ul></TooltipContent>
          </Tooltip>
          <Link
            href="/dashboard/admin"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            <span>CONFIGURAÇÕES</span>
          </Link>
        </nav>

      </SheetContent >
    </Sheet >
  );
}
