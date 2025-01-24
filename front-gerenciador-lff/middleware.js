import { NextResponse } from 'next/server';

export default function middleware(request) {
  const authCookie = request.cookies.get('CookieAuth')?.value;
  const { pathname } = request.nextUrl;

  // Verifica se o usuário está tentando acessar o dashboard sem autenticação
  if (!authCookie && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Evita redirecionamento desnecessário para o dashboard se o usuário já estiver lá
  if (authCookie && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Permite o restante da navegação
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', // Aplica o middleware às rotas do dashboard
    '/login', // Permite lógica de redirecionamento para /login
  ],
};
