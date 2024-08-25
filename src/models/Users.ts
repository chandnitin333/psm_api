
import prisma from '../config/conn';

export async function createUser(district_id:number, taluka_id:number, grampanchayat_id:number, gatgrampanchayat_id:number, name: string, email: string, username:string, password:string) {
    return await prisma.user.create({
        data: { name, email, username, district_id, taluka_id, grampanchayat_id, gatgrampanchayat_id, password } as any
    });
}

export async function getAllUsers(params) {
    return await prisma.user.findMany({
        where: {
            ...(params.searchText && {
                OR: [
                    { name: { contains: params.searchText } },
                    { district: { name: { contains: params.searchText } } },
                    { taluka: { name: { contains: params.searchText } } },
                    { grampanchayat: { name: { contains: params.searchText } } },
                    { gatgrampanchayat: { name: { contains: params.searchText } } }
                ]
            }),
            is_delete: 0
        },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            // district_id: true,
            // taluka_id: true,
            // grampanchayat_id: true,
            // gatgrampanchayat_id: true,
            is_active: true,
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
            },
            gatgrampanchayat: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        take: params?.limit || 10,
        skip: params?.pageNumber || 0
    });
}

/**
 * Function to get a user by ID.
 * 
 * @param userId - The ID of the user.
 * @returns A promise that resolves to the user.
 */
export async function getUser(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId, is_delete: 0 },
    });
    return user;
}

// Update a user by ID
export async function updateUser(id: number, data: { name?: string; email?: string; district_id?: number; taluka_id?: number; grampanchayat_id?: number; gatgrampanchayat_id?: number; username?: string; password?: string }) {
    const user = await prisma.user.update({
        where: { id: id, is_delete: 0 },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            district_id: true,
            taluka_id: true,
            grampanchayat_id: true,
            gatgrampanchayat_id: true,
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
            },
            gatgrampanchayat: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
        
    });
    return user;
}

// Delete a user by ID
export async function deleteUser(id: number) {
    const user = await prisma.user.update({
         where: { id: id },
         data: { is_delete: 1 },
         select: {
            id: true,
            name: true,
            email: true,
            username: true,
            // district_id: true,
            // taluka_id: true,
            // grampanchayat_id: true,
            // gatgrampanchayat_id: true,
            is_active: true,
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
            },
            gatgrampanchayat: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return user;
}


export async function getUsersCount() {
    const count = await prisma.user.count({
        where: {
            is_delete: 0
        }
    });
    return count;
}

export async function getGatGramPanchayatByGrampanhayatId(grampanchayat_id: number) {
    return await prisma.gatgrampanchayat.findMany({
        where: {
            grampanchayat_id: grampanchayat_id
        },
        select: {
            id: true,
            name: true,
        }
    });
}