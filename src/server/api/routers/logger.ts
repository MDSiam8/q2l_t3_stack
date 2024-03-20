import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const loggerRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  create: publicProcedure
    .input(z.object({ user: z.string().min(1), activity: z.string().min(1) })) // magic loops creates data stamp
    .mutation(async ({ ctx, input }) => {
      
      const url = 'https://magicloops.dev/api/loop/run/7d23dbac-e54a-4ce6-9e92-f3ef4c8ab23e';

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ input: JSON.stringify(input) }),
      });

      const responseJson = await response.json();
      console.log('STATUS:', responseJson.status);
      console.log('OUTPUT:', responseJson.loopOutput);

      return input
      // return ctx.db.post.create({
      //   data: {
      //     name: input.name,
      //   },
      // });
    }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });
  // }),
});
