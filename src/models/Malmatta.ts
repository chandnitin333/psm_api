
import prisma from '../config/conn';

export async function createMalmatta(milkateche_varnan: string, malmatteche_prakar_name: string) {
    return await prisma.malmatta.create({
        data: { milkateche_varnan, malmatteche_prakar_name }
    });
}

export async function getAllMalmatta(params) {
    return await prisma.malmatta.findMany({
        where: {
            ...(params.searchText && {
                milkateche_varnan: {
                    contains: params.searchText
                }
            }),
            is_delete: 0
        },
        select: {
            id: true,
            milkateche_varnan: true,
            malmatteche_prakar_name: true,
            is_delete: true
        },
        take: params?.limit || parseInt(process.env.PAGE_OFFSET) || 0,
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        }
    });
}


export async function getMalmatta(malmatta_id: number) {
    const result = await prisma.malmatta.findUnique({
        where: { id: malmatta_id, is_delete: 0 },
        select: {
            id: true,
            milkateche_varnan: true,
            malmatteche_prakar_name: true,
            is_delete: true
        },
    });
    return result;
}

export async function updateMalmatta(id: number, data: { milkateche_varnan?: string; malmatteche_prakar_name: string }) {
    const result = await prisma.malmatta.update({
        where: { id: id, is_delete: 0 },
        data,
        select: {
            id: true,
            milkateche_varnan: true,
            is_delete: true
        },
    });
    return result;
}

export async function deleteMalmatta(malmatta_id: number) {
    const result = await prisma.malmatta.update({
        where: { id: malmatta_id },
        data:{is_delete:1},
        select: {
            id: true,
            milkateche_varnan: true,
            malmatteche_prakar_name: true,
            is_delete: true
        },
    });
    return result;
}

export async function getMalmattaCount() {
    const count = await prisma.malmatta.count({
        where: {
            is_delete: 0
        }
    });
    return count;
}

export async function findMalmatta(params) {
   return await prisma.malmatta.findMany({
        where: {
            ...(params.searchText && {
                milkateche_varnan: {
                    equals: params.searchText
                }
            }),
            ...(params.malmatteche_prakar_name && {
                malmatteche_prakar_name: {
                    equals: params.malmatteche_prakar_name
                }
            }),
            is_delete: 0
        }
    });
}