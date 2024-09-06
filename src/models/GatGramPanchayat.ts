
import prisma from '../config/conn';

export async function createGatGramPanchayat(name: string, district_id: number, taluka_id: number, grampanchayat_id: number) {
    return await prisma.gatgrampanchayat.create({
        data: { name, district_id, taluka_id, grampanchayat_id }
    });
}

export async function getAllGatGrampanchayat(params) {
    return await prisma.gatgrampanchayat.findMany({
        where: {
            ...(params.searchText && {
                OR: [
                    {
                        name: {
                            contains: params.searchText
                        }
                    },
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

export async function getGatGramPanchayat(gpid: number) {
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

export async function updateGatGramPanchayat(gpid: number, data: { name?: string; district_id?: number; taluka_id?: number; grampanchayat_id?: number }) {  
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

export async function deleteGatGramPanchayat(gpid: number) {
    const gat_grampanchayat_data = await prisma.gatgrampanchayat.update({
        where: { id: gpid },
        data: { is_delete: 1 },
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

export async function getGatGramPanchayatCount() {
    const count = await prisma.gatgrampanchayat.count();
    return count;
}

export async function findGatGramPanchayat(params) {
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
            // ,is_delete: 0
        }
    });
}

export async function getAllGrampanchayatByTalukaId(d_id: number) {
    return await prisma.grampanchayat.findMany({
        where: {
            taluka_id: d_id
        },
        select: {
            id: true,
            name: true,
        }
    });
}