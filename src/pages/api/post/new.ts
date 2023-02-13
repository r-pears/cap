// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import {
  getSession,
} from "next-auth/react";

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, image, description } = req.body;

  console.log(req.body)

  const session = await getSession({ req });
  if (session && session.user && session?.user.email) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        image: image,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);    
    } 
  }
