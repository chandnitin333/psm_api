
import prisma from '../config/conn';

export async function createTax(tax_name: string) {
    return await prisma.tax.create({
        data: { tax_name}
    });
}

export async function getAllTax(params) {
    return await prisma.tax.findMany({
        where: {
            ...(params.searchText && {
                tax_name: {
                    contains: params.searchText
                }
            }),
            is_delete: 0
        },
        take: params?.limit || parseInt(process.env.PAGE_OFFSET) || 0,
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        }
    });
}


export async function getTax(id: number) {
    const result = await prisma.tax.findUnique({
        where: { id: id, is_delete: 0 },
        select: {
            id: true,
            tax_name: true,
            is_delete: true
        },
    });
    return result;
}

export async function updateTax(id: number, data: { tax_name?: string; }) {
    const result = await prisma.tax.update({
        where: { id: id, is_delete: 0 },
        data,
        select: {
            id: true,
            tax_name: true,
            is_delete: true
        },
    });
    return result;
}

export async function deleteTax(id: number) {
    const result = await prisma.tax.update({
        where: { id: id },
        data:{is_delete:1},
        select: {
            id: true,
            tax_name: true,
            is_delete: true
        },
    });
    return result;
}

export async function getTaxCount() {
    const count = await prisma.tax.count({
        where: {
            is_delete: 0
        }
    });
    return count;
}

export async function findTax(params) {
   return await prisma.tax.findMany({
        where: {
            ...(params.searchText && {
                tax_name: {
                    equals: params.searchText
                }
            }),
            is_delete: 0
        }
    });
}