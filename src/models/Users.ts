


import prisma from '../config/conn';

/**
 * Function to create a user.
 * 
 * @param name - The name of the user.
 * @param email - The email of the user.
 * @returns A promise that resolves to the created user.
 */
export async function createUser(name: string, email: string) {
    return await prisma.user.create({
        data: { name, email }
    });
}

/**
 * Function to get all users.
 * 
 * @returns A promise that resolves to an array of users.
 */
export async function getAllUsers(params) {
    console.log("params?.pageNumber", params?.pageNumber)
    return await prisma.user.findMany({
        where: {
            ...(params.searchText && {
                name: {
                    contains: params.searchText
                }
            })
        },
        // take: params?.limit || process.env.PAGE_OFFSET || 0,
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
        where: { id: userId },
    });
    return user;
}

// Update a user by ID
export async function updateUser(userId: number, data: { name?: string; email?: string }) {
    const user = await prisma.user.update({
        where: { id: userId },
        data,
    });
    return user;
}

// Delete a user by ID
export async function deleteUser(userId: number) {
    const user = await prisma.user.delete({
        where: { id: userId },
    });
    return user;
}
