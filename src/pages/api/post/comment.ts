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
  const { id, content, title } = req.body;
  
  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (session && session.user && session?.user.email) {
      const result = await prisma.comment.create({
        data: {
          title: title,
          content: content,
          post: { connect: { id: id } },
          author: { connect: { email: session?.user?.email } },
        },
      });
      res.json(result);
    }
  } else if (req.method === 'GET') {
    const comments = await prisma.comment.findMany({
      where: {
        postId: id
      },
    })
    res.json(comments);
  }
}
