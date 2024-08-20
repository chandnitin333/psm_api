
import prisma from '../config/conn';


export async function getAdminUser(username: string) {
    const user = await prisma.admin_user.findUnique({
        where: { username: username },
    });
    return user;
}