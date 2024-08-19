


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
export async function getUsers() {
    return await prisma.user.findMany();
}
