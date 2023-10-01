import 'server-only';
import prisma from '@/lib/db';
import { cache } from 'react';
import { recordType } from '@/types/dashboard';

export const get_records = cache(async (user_id: string) => {
    const records = await prisma.record.findMany({
        where: {
            owner: user_id
        },
        take: 100,
        orderBy: {
            recordDate: "desc"
        }
    })
    return records as recordType[]
})

