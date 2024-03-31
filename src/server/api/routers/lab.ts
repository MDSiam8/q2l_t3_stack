import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const labRouter = createTRPCRouter({
    createLab: publicProcedure
        .input(z.object({ name: z.string(), userId: z.string()}))
        .mutation(async ({ input, ctx }) => {
            const lab = await ctx.db.lab.create({
                data: {
                    name: input.name,
                    status: "active",
                    userId: input.userId
                },
            });
            return lab
    }),
    getLabById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const lab = await ctx.db.lab.findFirst({
                where: {
                    id: input.id
                }
            })
            return lab;
    }),
    markLabAsComplete: publicProcedure
        .input(z.object({ userId: z.string(), id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const lab = await ctx.db.lab.update({
                where: {
                    userId: input.userId,
                    id: input.id
                },
                data: {
                    status: "completed"
                }
            })
            return lab;
    }),
    updateLabProgress: publicProcedure
        .input(z.object({ userId: z.string(), id: z.string(), progress: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const lab = await ctx.db.lab.update({
                where: {
                    userId: input.userId,
                    id: input.id
                },
                data: {
                    progress: input.progress
                }
            })
            return lab;
    }),
    deleteLab: publicProcedure
        .input(z.object({ userId: z.string(), id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const lab = await ctx.db.lab.delete({
                where: {
                    userId: input.userId,
                    id: input.id
                }
            })
            return lab;
    })

});
