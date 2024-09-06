
import { env } from 'process';
import prisma from '../config/conn';
/**
 * Function to check if a taluka exists by name.
 * 
 * @param name - The name of the taluka.
 * @returns A promise that resolves to a boolean indicating if the district exists.
 */

export async function createTaluka(name: string, district_id: number) {
    return await prisma.taluka.create({
        data: { name, district_id }
    });
}

/**
 * Function to get all taluka.
 * 
 * @returns A promise that resolves to an array of taluka.
 */
export async function getAllTalukas(params) {

    return await prisma.taluka.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    contains: params.searchText
                }
            })
        },

        include: {
            district: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        take: parseInt(env.PAGE_OFFSET || '10'),
        skip: params?.pageNumber || 0,
        orderBy: {
            id: 'desc'
        },
    });
}

/**
 * Function to get a taluka by ID.
 * 
 * @param talukaId - The ID of the taluka.
 * @returns A promise that resolves to the taluka.
 */
export async function getTaluka(talukaId: number) {
    const taluka = await prisma.taluka.findUnique({
        where: { id: talukaId },
        include: {
            district: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return taluka;
}

// Update a taluka by ID
export async function updateTaluka(talukaId: number, data: { name?: string; district_id?: number }) {
    const taluka = await prisma.taluka.update({
        where: { id: talukaId },
        data,
        select: {
            id: true,
            name: true,
            district_id: true
        }
    });
    return taluka;
}

// Delete a taluka by ID
export async function deleteTaluka(talukaId: number) {
    const taluka = await prisma.taluka.update({
        where: { id: talukaId },
        data:{ is_delete: 1},
        select:{
            id: true,
            name: true,
            district_id: true
        }
    });
    return taluka;
}


/**
 * Function to get the count of talukas.
 * 
 * @returns A promise that resolves to the count of talukas.
 */
export async function getTalukaCount() {
    const count = await prisma.taluka.count();
    return count;
}

export async function findTaluka(params) {
    return await prisma.taluka.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    contains: params.searchText
                }
            }),
            ...(params.id && {
                district_id: params.id
            })
            // ,
            // is_delete: 0
        }
    });
}