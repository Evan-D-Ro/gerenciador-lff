'use client' // Adicione esta linha no topo do arquivo

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
export function User() {

  const [usuario, setUsuario] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const nomeUsuario = localStorage.getItem('usuario');

    if (nomeUsuario) {
      // Se o nome do usuário já estiver no localStorage, usa o valor
      setUsuario(nomeUsuario);
    } else {
      // Caso contrário, busca os dados
      obterDados();
    }
  }, []);

  const obterDados = () => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Inclui cookies na requisição
    };

    const url = `${process.env.NEXT_PUBLIC_API_IP}/auth/get-dados`;

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro na resposta da requisição');
        }
      })
      .then((data) => {
        // Armazena no localStorage e atualiza o estado
        localStorage.setItem('usuario', data.nome);
        setUsuario(data.nome);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  const logout = async () => {
    let options: RequestInit = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Certifique-se de que 'include' é exatamente como esperado
    };

    let url = `${process.env.NEXT_PUBLIC_API_IP}/auth/logout`;

    fetch(url, options)
      .then(r => {
        if (r.ok) {
          console.log('ok');
          localStorage.removeItem('usuario');
          router.push('/login'); // Redireciona para a página de login
        } else {
          console.log("Ocorreu um erro");
          throw new Error('Erro ao fazer logout');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={'/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{usuario ? usuario : "Minha conta"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuItem>Suporte</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>
          <button onClick={logout}>Sair</button>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu >
  );
}
