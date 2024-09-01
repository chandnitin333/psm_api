
import prisma from '../config/conn';

export async function createPrakar(prakar_name: string) {
    return await prisma.prakar.create({
        data: { prakar_name }
    });
}

export async function getAllPrakars(params) {
    return await prisma.prakar.findMany({
        where: {
            ...(params.searchText && {
                prakar_name: {
                    contains: params.searchText
                }
            }),
            is_delete: 0
        },
        select: {
            id: true,
            prakar_name: true,
            is_delete: true
        },
        take: params?.limit || parseInt(process.env.PAGE_OFFSET) || 0,
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        }
    });
}


export async function getPrakar(prakar_id: number) {
    const prakar = await prisma.prakar.findUnique({
        where: { id: prakar_id, is_delete: 0 },
    });
    return prakar;
}

export async function updatePrakar(prakar_id: number, data: { prakar_name?: string; }) {
    const prakar = await prisma.prakar.update({
        where: { id: prakar_id, is_delete: 0 },
        data,
        select: {
            id: true,
            prakar_name: true,
            is_delete: true
        },
    });
    return prakar;
}

export async function deletePrakar(prakar_id: number) {
    const prakar = await prisma.prakar.update({
        where: { id: prakar_id },
        data:{is_delete:1},
        select: {
            id: true,
            prakar_name: true,
            is_delete: true
        },
    });
    return prakar;
}

export async function getPrakarCount() {
    const count = await prisma.prakar.count({
        where: {
            is_delete: 0
        }
    });
    return count;
}

export async function findPrakar(params) {
   return await prisma.prakar.findMany({
        where: {
            ...(params.searchText && {
                prakar_name: {
                    equals: params.searchText
                }
            }),
            is_delete: 0
        }
    });
}