import { Express } from 'express';
import { Space } from '.prisma/client';
import db from '@/db';
import { createRestPolicy } from '@/lib/policies';

export default createRestPolicy({
  index: () => true,
  create: () => true,
  show: async (user?: Express.User, space?: Space): Promise<boolean> => {
    if (!user || !space) {
      return false;
    }

    const userSpace = await db.usersOnSpaces.findFirst({
      where: {
        userId: user.id,
        spaceId: space.id,
      },
    });

    return !!userSpace;
  },
});
