
// ------------------------------------------------------------------------------------------------------------------


export async function getEscolas(search: string, offset: number) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/escola`);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }

    const data = await response.json();
    return {
        escolas: data.escolas,
        newOffset: data.newOffset,
        totalEscolas: data.totalEscolas
    };
}


export async function getAllEscolas() {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/escola/get-all`);
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }

    const data = await response.json();
    return {
        escolas: data.escolas,
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
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }

    const data = await response.json();
    return {
        turmas: data.turmas,
        newOffset: data.newOffset,
        totalTurmas: data.totalTurmas
    };
}

export async function getAllTurmas() {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/turma/get-all`);
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }

    const data = await response.json();
    return {
        turmas: data.turmas,
    };
}

//CRIANÇAS --------------------------------------------------------------------------------------------------------------------------------

export async function getCriancas(search: string, offset: number, selectTab: string) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/crianca`);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('selectTab', selectTab.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }


    const data = await response.json();
    return {
        criancas: data.criancas,
        newOffset: data.newOffset,
        totalCriancas: data.totalCriancas
    };
}

export async function getCriancasEscola(search: string, offset: number, selectTab: string, idEscola: string, idTurma: string) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/crianca/escola`);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('selectTab', selectTab.toString());
    url.searchParams.append('idEscola', idEscola.toString());
    url.searchParams.append('idTurma', idTurma.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }


    const data = await response.json();
    return {
        criancas: data.criancas,
        newOffset: data.newOffset,
        totalCriancas: data.totalCriancas
    };
}

export async function getCriancasTurma(search: string, offset: number, selectTab: string, idTurma: string) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/crianca/turma`);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('selectTab', selectTab.toString());
    url.searchParams.append('idTurma', idTurma.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }


    const data = await response.json();
    return {
        criancas: data.criancas,
        newOffset: data.newOffset,
        totalCriancas: data.totalCriancas
    };
}

export async function getChamada(idTurma: string, dataChamada: string) {
    const formattedDataChamada = new Date(dataChamada).toISOString().split('T')[0];

    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/chamada/get-chamada`);
    url.searchParams.append('idTurma', idTurma.toString());
    url.searchParams.append('dataChamada', formattedDataChamada);  // Passar a data formatada

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }

    const data = await response.json();
    return {
        presencas: data.presencas || []
    };
}


export async function salvarCrianca(crianca: any) {
    const url = `${process.env.NEXT_PUBLIC_API_IP}/api/crianca/salvar`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(crianca)
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        } else {
            window.location.href = "/dashboard/error";
        }
    }
    else {
        window.location.reload();
    }

    return await response.json();
}

export async function deletarCrianca(id: number) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/crianca/deletar`);
    url.searchParams.append('id', id.toString());

    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        } else {
            window.location.href = "/dashboard/error";
        }
    }
    else {
        window.location.reload();
    }
}

//FIM CRIANÇAS --------------------------------------------------------------------------------------------------------------------------------


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
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }

    const data = await response.json();

    return data.permissoes;
}

export async function getPermissoesUser(usuario: string) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/auth/get-permissoes-user`);
    url.searchParams.append('usuario', usuario);

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }

    const data = await response.json();

    return data.permissoes;
}


export async function getPessoas(search: string, offset: number, selectTab: string) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_IP}/api/usuarios`);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('selectTab', selectTab.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/dashboard/unauthorized";
        }
        else {
            window.location.href = "/dashboard/error";
        }
    }

    const data = await response.json();
    return {
        pessoas: data.pessoas,
        newOffset: data.newOffset,
        totalPessoas: data.totalPessoas
    };
}