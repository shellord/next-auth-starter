import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handle(req, res) {
  const session = await getSession({ req })

  if (req.method === 'POST') {
    const { username } = req.body
    const addUsername = await prisma.user.update({
      where: { id: session?.user.id },
      data: { username: username },
    })
    return res.status(200).json({
      username: addUsername.username,
    })
  } else {
    res.status(405).end()
  }
}
