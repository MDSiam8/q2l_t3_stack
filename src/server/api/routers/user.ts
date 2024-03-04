import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'


export const userRouter = createTRPCRouter({
    userCreate: publicProcedure //endpoint
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.db.user.create({
                data: {
                    name: input.name
                },
            });
            return user
        }),

    getUserId: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input, ctx }) => {
            const user = await ctx.db.user.findFirst({
                where: {
                    name: input.name
                },
                select: {
                    id: true
                }
            })
            return user
        })
})