
import prisma from '../config/conn';

export async function createOtherTax( district_id: number, taluka_id: number, grampanchayat_id: number, tax_details: string[]) {
    return await prisma.othertax.create({
        data: { district_id, taluka_id, grampanchayat_id, tax_details: tax_details.join(", ") }
    });
}

export async function getAllOtherTax(params) {
    return await prisma.othertax.findMany({
        where: {
            ...(params.searchText && {
                OR: [
                    {
                        district: {
                            name: {
                                contains: params.searchText
                            }
                        }
                    },
                    {
                        taluka: {
                            name: {
                                contains: params.searchText
                            }
                        }
                    },
                    {
                        grampanchayat: {
                            name: {
                                contains: params.searchText
                            }
                        }
                    }
                ]
            })
        },
        take: params?.limit || 10,
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        },
        include:{
            district:{
                select: {
                    id: true,
                    name: true
                }
            },
            taluka:{
                select: {
                    id: true,
                    name: true
                }
            },
            grampanchayat:{
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
}

export async function getOtherTax(id: number) {
    const output = await prisma.othertax.findUnique({
        where: { id: id },
        include:{
            // Remove the 'select' property
            // Remove the 'tax_details' property
            // tax_details: true,
            // is_delete: true,
            district:{
                select: {
                    id: true,
                    name: true
                }
            },
            taluka:{
                select: {
                    id: true,
                    name: true
                }
            },
            grampanchayat:{
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return output;
}

export async function updateOtherTax(id: number, data: { district_id?: number; taluka_id?: number; grampanchayat_id?: number; tax_details?: string[] }) {  
    const result = await prisma.othertax.update({
        where: { id: id },
        data: {
            district_id: data.district_id,
            taluka_id: data.taluka_id,
            grampanchayat_id: data.grampanchayat_id,
            tax_details: data.tax_details?.join(", ")
        },
        select: {
            id: true,
            district_id: true,
            taluka_id: true,
            grampanchayat_id: true,
            tax_details: true,
            is_delete: true,
            district: {
                select: {
                    id: true,
                    name: true
                }
            },
            taluka: {
                select: {
                    id: true,
                    name: true
                }
            },
            grampanchayat: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return result;
}

export async function deleteOtherTax(id: number) {
    const result = await prisma.othertax.update({
        where: { id: id },
        data:{is_delete:1},
        select: {
            id: true,
            district_id: true,
            taluka_id: true,
            grampanchayat_id: true,
            tax_details: true,
            is_delete: true,
            district: {
                select: {
                    id: true,
                    name: true
                }
            },
            taluka: {
                select: {
                    id: true,
                    name: true
                }
            },
            grampanchayat: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return result;
}

export async function getOtherTaxCount() {
    const count = await prisma.othertax.count();
    return count;
}

export async function findOtherTax(params) {
    return await prisma.othertax.findMany({
        where: {
            ...(params.d_id && {
                district_id: params.d_id
            }),
            ...(params.t_id && {
                taluka_id: params.t_id
            }),
            ...(params.g_id && {
                grampanchayat_id: params.g_id
            })
        }
    });
}

export async function updateTaxDetailsx(id: number, data: { tax_details?: string[] }) {  
    const result = await prisma.othertax.update({
        where: { id: id },
        data: {
            tax_details: data.tax_details?.join(", ")
        },
        select: {
            id: true,
            district_id: true,
            taluka_id: true,
            grampanchayat_id: true,
            tax_details: true,
            is_delete: true,
            district: {
                select: {
                    id: true,
                    name: true
                }
            },
            taluka: {
                select: {
                    id: true,
                    name: true
                }
            },
            grampanchayat: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return result;
}