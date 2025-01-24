"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';

export default function LoginPage() {

  const router = useRouter();

  const [aguadar, setAguardar] = useState(false);

  const [mostrarPopup, setMostrarPopup] = useState(false);

  const [error, setError] = useState(''); // Estado para armazenar a mensagem de erro

  const [stateUsuario, setStateUsuario] = useState({
    usuario: "",
    senha: ""
  });

  const Popup: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className='popup-topper'>
          <h2>CONTATE O ADMINISTRADOR</h2>
        </div>
        <div className='popup-meio'>
          <p>Soraya El Gharib Jorge Estevam</p>
          <p>Coordenadora</p>
          <hr />
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>

      </div>
    </div>
  );


  const isEmpty = (value: string | number | null | undefined): boolean => {
    return (
      value == null || // null ou undefined
      (typeof value === 'string' && value.trim() === '') || // string vazia
      (Array.isArray(value) && value.length === 0) || // array vazio
      (value.constructor === Object && Object.keys(value).length === 0) // objeto vazio
    );
  };


  const fazerLogin = async () => {
    if (stateUsuario.usuario == '') {
      setError("Preencha o usuário...");
      return;
    }
    if (stateUsuario.senha == '') {
      setError("Preencha a senha...");
      return;
    }
    setAguardar(true);
    let options: RequestInit = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario: stateUsuario.usuario, senha: stateUsuario.senha }),
      credentials: 'include', // Certifique-se de que 'include' é exatamente como esperado
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_IP}/auth/login`, options);
      setAguardar(false);

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText);
        return;
      }
      else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Erro de conexão...");
      setAguardar(false);
    }
  };



  return (
    <div className="min-h-screen flex justify-center items-center p-8 bg-gray-50 dark:bg-gray-800 relative">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat dark:opacity-50"
        style={{
          backgroundImage: "url('/logo-lar.png')",
          opacity: 0.3,
        }}
      ></div>

      <Card
        className="w-full max-w-sm relative z-10 bg-gray-100 dark:bg-gray-900 dark:text-white"
      >
        <CardHeader>
          <CardTitle className="text-2xl text-center dark:text-gray-100">
            Bem-vindo
          </CardTitle>
          <CardDescription className="text-center text-gray-800 dark:text-gray-300">
            Por favor, insira suas credenciais para acessar sua conta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div
            className="w-full space-y-4"
          >
            {/* Campo de nome de usuário */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black dark:text-gray-300">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={stateUsuario.usuario}
                onChange={(e) =>
                  setStateUsuario(prevState => ({ ...prevState, usuario: e.target.value }))}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-black"
                placeholder="Digite seu nome de usuário"
              />
            </div>

            {/* Campo de senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black dark:text-gray-300">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={stateUsuario.senha}
                onChange={(e) => setStateUsuario(prevState => ({ ...prevState, senha: e.target.value }))}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-black"
                placeholder="Digite sua senha"
              />
              <div className='mt-1'>
                <button onClick={() => setMostrarPopup(true)} className="text-blue-700 hover:text-blue-900 text-sm">
                  Esqueci a senha...
                </button>
              </div>
            </div>

            {/* Botão de login */}
            <div>
              <Button onClick={fazerLogin} className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Entrar
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {error && <span className="text-red-600 text-sm font-medium">{error}</span>}
        </CardFooter>
      </Card>
      {mostrarPopup && <Popup onClose={() => setMostrarPopup(false)} />}
    </div>
  );
}
