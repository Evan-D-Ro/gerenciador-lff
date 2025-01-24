
// ------------------------------------------------------------------------------------------------------------------


export async function getEscolas(search: string, offset: number) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/escola`);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar escolas.');
    }

    const data = await response.json();
    return {
        escolas: data.escolas,
        newOffset: data.newOffset,
        totalEscolas: data.totalEscolas
    };
}


export async function getTurmas(search: string, offset: number) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/turma`);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar turmas.');
    }

    const data = await response.json();
    return {
        turmas: data.turmas,
        newOffset: data.newOffset,
        totalTurmas: data.totalTurmas
    };
}


export async function getCriancas(search: string, offset: number, selectTab: string) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/crianca`);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('selectTab', selectTab.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar crianças.');
    }

    const data = await response.json();
    return {
        criancas: data.criancas,
        newOffset: data.newOffset,
        totalCriancas: data.totalCriancas
    };
}


export async function getPermissoes() {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/auth/get-permissoes`);

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar permissoes');
    }

    const data = await response.json();

    return data.permissoes;
}


export async function getUsuarios() {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/usuarios`);

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar usuários.');
    }

    const data = await response.json();
    return {
        usuarios: data.usuarios,
        newOffset: data.newOffset,
        totalUsuarios: data.totalUsuarios
    };
}