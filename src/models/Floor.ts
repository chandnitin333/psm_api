
import prisma from '../config/conn';

export async function createFloor(floor_name: string) {
    return await prisma.floor.create({
        data: { floor_name }
    });
}

export async function getAllFloors(params) {
    return await prisma.floor.findMany({
        where: {
            ...(params.searchText && {
                floor_name: {
                    contains: params.searchText
                }
            }),
            is_delete: 0
        },
        select: {
            id: true,
            floor_name: true
        },
        take: params?.limit || parseInt(process.env.PAGE_OFFSET) || 0,
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        }
    });
}


export async function getFloor(floor_id: number) {
    const district = await prisma.floor.findUnique({
        where: { id: floor_id, is_delete: 0 },
    });
    return district;
}

export async function updateFloor(floor_id: number, data: { floor_name?: string; }) {
    const floor = await prisma.floor.update({
        where: { id: floor_id, is_delete: 0 },
        data,
        select: {
            id: true,
            floor_name: true
        },
    });
    return floor;
}

export async function deleteFloor(floor_id: number) {
    const floor = await prisma.floor.update({
        where: { id: floor_id },
        data:{is_delete:1},
        select: {
            id: true,
            floor_name: true,
            is_delete: true
        },
    });
    return floor;
}

export async function getFloorCount() {
    const count = await prisma.floor.count({
        where: {
            is_delete: 0
        }
    });
    return count;
}

export async function findFloor(params) {
   return await prisma.floor.findMany({
        where: {
            ...(params.searchText && {
                floor_name: {
                    equals: params.searchText
                }
            }),
            is_delete: 0
        }
    });
}