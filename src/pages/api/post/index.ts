// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getAllPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true
      }
    })
    res.status(200).json(posts)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
