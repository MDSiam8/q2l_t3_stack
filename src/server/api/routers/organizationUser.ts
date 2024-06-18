import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const organizationUserRouter = createTRPCRouter({
    createOrganizationUser: publicProcedure
        .input(z.object({
            userId: z.string(),
            organizationId: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            // Create a new organizationUser
            // console.log("entered here")
            // console.log(input.userId, input.organizationId)
            const organizationUser = await ctx.db.organizationUser.create({
                data: {
                    userId: input.userId,
                    organizationId: input.organizationId,
                },
            });
            // console.log(organizationUser)
            return organizationUser;
        }),

    deleteOrganizationUser: publicProcedure
        .input(z.object({ userId: z.string(), organizationId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const organizationUser = await ctx.db.organizationUser.delete({
                where: {
                    userId_organizationId: {
                        userId: input.userId,
                        organizationId: input.organizationId
                    }
                },
            });
            return organizationUser;
        }),
    // update orgs for a user
    updateUserOrganizations: publicProcedure
        .input(z.object({
            userId: z.string(),
            organizationIds: z.array(z.string()),
        }))
        .mutation(async ({ input, ctx }) => {
            const { userId, organizationIds } = input;
            await ctx.db.organizationUser.deleteMany({
                where: { userId },
            });
            await ctx.db.organizationUser.createMany({
                data: organizationIds.map(organizationId => ({
                    userId,
                    organizationId,
                })),
            });
        }),
    // update users for an org
    updateOrganizationUsers: publicProcedure
        .input(z.object({
            organizationId: z.string(),
            userIds: z.array(z.string()),
        }))
        .mutation(async ({ input, ctx }) => {
            const { organizationId, userIds } = input;
            await ctx.db.organizationUser.deleteMany({
                where: { organizationId },
            });
            await ctx.db.organizationUser.createMany({
                data: userIds.map(userId => ({
                    userId,
                    organizationId,
                })),
            });
        }),
});
