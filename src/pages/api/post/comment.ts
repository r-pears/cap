// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import {
  getSession,
} from "next-auth/react";

const prisma = new PrismaClient()

export default async function getAllPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id, content, title } = req.body;

    const session = await getSession({ req });
    if (session && session.user && session?.user.email) {
      const result = await prisma.comment.create({
        data: {
          title: title,
          post: id,
          content: content,
          author: { connect: { email: session?.user?.email } },
        },
      });
      res.json(result);
    }
  }
}
