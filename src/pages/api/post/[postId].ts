// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getAllPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { id } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id
      },
      include: {
        comments: true,
        author:true,
      },
    })
    res.status(200).json(post)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
