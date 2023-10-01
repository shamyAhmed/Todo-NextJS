import 'server-only';
import prisma from '@/lib/db';
import { User } from '@/types/user';
import { cache } from 'react';

export const get_or_create_user = cache(async function(userInfo: User){
    const user = await prisma.user.findFirst({where: {uid: userInfo.uid}})
    if (user){
        return user
    }
    try{
        const user = await prisma.user.create({
            data: {
                name: userInfo.name,
                email: userInfo.email,
                uid: userInfo.uid
            }
        })
        return user
    }catch{
        return null;
    }
})