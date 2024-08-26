
import prisma from '../config/conn';

export async function createMalmattechePrakar(name: string) {
    return await prisma.malmattecheprakar.create({
        data: { name }
    });
}

export async function getAllMalmattechePrakars(params) {
    return await prisma.malmattecheprakar.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    contains: params.searchText
                }
            }),
            is_delete: 0
        },
        select: {
            id: true,
            name: true,
            is_delete: true
        },
        take: params?.limit || parseInt(process.env.PAGE_OFFSET) || 0,
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        }
    });
}


export async function getMalmattechePrakar(mal_prakar_id: number) {
    const prakar = await prisma.malmattecheprakar.findUnique({
        where: { id: mal_prakar_id, is_delete: 0 },
    });
    return prakar;
}

export async function updateMalmattechePrakar(prakar_id: number, data: { name?: string; }) {
    const prakar = await prisma.malmattecheprakar.update({
        where: { id: prakar_id, is_delete: 0 },
        data,
        select: {
            id: true,
            name: true,
            is_delete: true
        },
    });
    return prakar;
}

export async function deleteMalmattechePrakar(mal_prakar_id: number) {
    const prakar = await prisma.malmattecheprakar.update({
        where: { id: mal_prakar_id },
        data:{is_delete:1},
        select: {
            id: true,
            name: true,
            is_delete: true
        },
    });
    return prakar;
}

export async function getMalmattechePrakarCount() {
    const count = await prisma.malmattecheprakar.count({
        where: {
            is_delete: 0
        }
    });
    return count;
}

export async function findMalmattechePrakar(params) {
   return await prisma.malmattecheprakar.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    equals: params.searchText
                }
            }),
            is_delete: 0
        }
    });
}

export async function getAllMalmattechePrakarForDDL() {
     return await prisma.malmattecheprakar.findMany({
        where: {
            is_delete: 0
        },
        select: {
            id: true,
            name: true
        }
     });
}