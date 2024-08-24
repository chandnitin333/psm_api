
import prisma from '../config/conn';

export async function createGramPanchayat(name: string, district_id: number, taluka_id: number) {
    return await prisma.grampanchayat.create({
        data: { name, district_id, taluka_id }
    });
}

export async function getAllGrampanchayat(params) {
    return await prisma.grampanchayat.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    contains: params.searchText
                }
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
            }
        }
    });
}

export async function getGramPanchayat(gpid: number) {
    const grampanchayat_data = await prisma.grampanchayat.findUnique({
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
            }
        }
    });
    return grampanchayat_data;
}

// export async function updateGramPanchayat(gpid: number, data: { name?: string; district_id?: number; taluka_id?: number }) {
//     const grampanchayat_data = await prisma.grampanchayat.update({
//         where: { id: gpid },
//         data,
//          select:{
//             id: true,
//             name: true,
//             district_id: true,
//             taluka_id: true
//         }
//     });
//     return grampanchayat_data;
// }
export async function updateGramPanchayat(gpid: number, data: { name?: string; district_id?: number; taluka_id?: number }) {
            const grampanchayat_data = await prisma.grampanchayat.update({
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
                    }
                }
            });
            return grampanchayat_data;
        }

export async function deleteGramPanchayat(gpid: number) {
    const grampanchayat_data = await prisma.grampanchayat.delete({
        where: { id: gpid },
    });
    return grampanchayat_data;
}

export async function getGramPanchayatCount() {
    const count = await prisma.grampanchayat.count();
    return count;
}

export async function findGramPanchayat(params) {
    return await prisma.grampanchayat.findMany({
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
            })
        }
    });
}

export async function getAllTalukaByDistrict(d_id: number) {
    return await prisma.taluka.findMany({
        where: {
            district_id: d_id
        },
        select: {
            id: true,
            name: true,
        }
    });
}