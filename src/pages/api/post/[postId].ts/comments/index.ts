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

  const { id } = req.body;

  if (req.method === 'GET') {
    try {
      const post = await prisma.comment.findMany({
        where: {
          postId: id
        }
      })
      res.status(200).json(post)
    } catch (error) {
      console.log(`Error: ${error}`)
    }    
  } else if (req.method === 'POST') {
  const { title, content, postId } = req.body;

  console.log(req.body)

  const session = await getSession({ req });
  if (session && session.user && session?.user.email) {
    const result = await prisma.comment.create({
      data: {
        post: postId,
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);    
    } 
  }
}