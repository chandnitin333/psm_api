
import prisma from '../config/conn';

export async function createMilkatVapar(name: string, malmatteche_prakar_id: number) {
    return await prisma.milkar_vapar.create({
        data: { name, malmatteche_prakar_id }
    });
}

export async function getAllMilkatVapar(params) {
    return await prisma.milkar_vapar.findMany({
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
            is_delete: true,
            malmatteche_prakar: { 
                select: {
                    id: true,
                    name: true
                }
            }
        },
        take: params?.limit || parseInt(process.env.PAGE_OFFSET) || 0,
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        }
    });
}


export async function getMilkatVapar(milkat_id: number) {
    const milkar = await prisma.milkar_vapar.findUnique({
        where: { id: milkat_id, is_delete: 0 },
        select: {
            id: true,
            name: true,
            is_delete: true,
            malmatteche_prakar: { 
                select: {
                    id: true,
                    name: true
                }
            }
        },
    });
    return milkar;
}

export async function updateMilkatVapar(milkat_id: number, data: { name?: string; malmatteche_prakar_id: number }) {
    const prakar = await prisma.milkar_vapar.update({
        where: { id: milkat_id, is_delete: 0 },
        data,
        select: {
            id: true,
            name: true,
            is_delete: true
        },
    });
    return prakar;
}

export async function deleteMilkatVapar(milkat_id: number) {
    const prakar = await prisma.milkar_vapar.update({
        where: { id: milkat_id },
        data:{is_delete:1},
        select: {
            id: true,
            name: true,
            is_delete: true
        },
    });
    return prakar;
}

export async function getMilkatVaparCount() {
    const count = await prisma.milkar_vapar.count({
        where: {
            is_delete: 0
        }
    });
    return count;
}

export async function findMilkatVapar(params) {
   return await prisma.milkar_vapar.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    equals: params.searchText
                }
            }),
            ...(params.malmatteche_prakar_id && {
                malmatteche_prakar_id: {
                    equals: params.malmatteche_prakar_id
                }
            }),
            is_delete: 0
        }
    });
}