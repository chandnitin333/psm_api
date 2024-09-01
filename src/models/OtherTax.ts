
import prisma from '../config/conn';

export async function createOtherTax( district_id: number, taluka_id: number, grampanchayat_id: number, tax_details: string) {
    return await prisma.othertax.create({
        data: { district_id, taluka_id, grampanchayat_id,tax_details }
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

export async function getOtherTax(gpid: number) {
    const gat_grampanchayat_data = await prisma.gatgrampanchayat.findUnique({
        where: { id: gpid },
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
    return gat_grampanchayat_data;
}

export async function updateOtherTax(gpid: number, data: { name?: string; district_id?: number; taluka_id?: number; grampanchayat_id?: number }) {  
            const gat_grampanchayat_data = await prisma.gatgrampanchayat.update({
                where: { id: gpid },
                data,
                select: {
                    id: true,
                    name: true,
                    district_id: true,
                    taluka_id: true,
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
            return gat_grampanchayat_data;
        }

export async function deleteOtherTax(gpid: number) {
    const grampanchayat_data = await prisma.gatgrampanchayat.delete({
        where: { id: gpid },
    });
    return grampanchayat_data;
}

export async function getOtherTaxCount() {
    const count = await prisma.gatgrampanchayat.count();
    return count;
}

export async function findOtherTax(params) {
    return await prisma.gatgrampanchayat.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    contains: params.searchText
                }
            }),
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