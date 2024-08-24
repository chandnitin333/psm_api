
import prisma from '../config/conn';
/**
 * Function to check if a district exists by name.
 * 
 * @param name - The name of the district.
 * @returns A promise that resolves to a boolean indicating if the district exists.
 */

export async function createDistrict(name: string) {
    return await prisma.district.create({
        data: { name }
    });
}

/**
 * Function to get all districts.
 * 
 * @returns A promise that resolves to an array of districts.
 */
export async function getAllDistricts(params) {
return await prisma.district.findMany({
    where: {
        ...(params.searchText && {
            name: {
                contains: params.searchText
            }
        })
    },
    select: {
        id: true,
        name: true
    },
    take: params?.limit || parseInt(process.env.PAGE_OFFSET) || 0,
    skip: params?.pageNumber || 0,
    orderBy: {
        id: 'desc'
    }
});
}

export async function getAllDistrictForDDL() {
     return await prisma.district.findMany();
}

/**
 * Function to get a district by ID.
 * 
 * @param districtId - The ID of the district.
 * @returns A promise that resolves to the district.
 */
export async function getDistrict(districtId: number) {
    const district = await prisma.district.findUnique({
        where: { id: districtId },
    });
    return district;
}

// Update a district by ID
export async function updateDistrict(districtId: number, data: { name?: string; }) {
    const district = await prisma.district.update({
        where: { id: districtId },
        data,
        select: {
            id: true,
            name: true
        },
    });
    return district;
}

// Delete a district by ID
export async function deleteDistrict(districtId: number) {
    const district = await prisma.district.delete({
        where: { id: districtId },
    });
    return district;
}

export async function getDistrictCount() {
    const count = await prisma.district.count();
    return count;
}

export async function findDistrict(params) {
   return await prisma.district.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    contains: params.searchText
                }
            })
        }
    });
}