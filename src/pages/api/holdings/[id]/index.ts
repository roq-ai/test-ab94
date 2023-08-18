import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { holdingValidationSchema } from 'validationSchema/holdings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.holding
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getHoldingById();
    case 'PUT':
      return updateHoldingById();
    case 'DELETE':
      return deleteHoldingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getHoldingById() {
    const data = await prisma.holding.findFirst(convertQueryToPrismaUtil(req.query, 'holding'));
    return res.status(200).json(data);
  }

  async function updateHoldingById() {
    await holdingValidationSchema.validate(req.body);
    const data = await prisma.holding.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteHoldingById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.holding.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
