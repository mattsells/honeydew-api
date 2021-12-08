import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';

import db from '@/db';
import authorize from '@/policies/spaces';
import { paginate } from '@/utils/request';

const router = Router();

router.get('/spaces', async (req, res, next) => {
  try {
    authorize('index');

    const spaces = await db.space.findMany({
      ...paginate(req),
    });

    res.json(spaces);
  } catch (err) {
    next(err);
  }
});

router.post('/spaces', body('space.name').notEmpty().trim(), async (req, res, next): Promise<void> => {
  try {
    authorize('create');

    // TODO: Do this in middleware
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const space = await db.space.create({
      data: {
        name: req.body.space.name,
        users: {
          create: [
            {
              role: 'ADMIN',
              user: {
                connect: {
                  id: req.user?.id,
                },
              },
            },
          ],
        },
      },
    });

    res.json(space);
  } catch (err) {
    next(err);
  }
});

router.get('/spaces/:id', param('id').toInt(), async (req, res, next) => {
  try {
    const space = await db.space.findUnique({
      where: {
        id: req.params!.id,
      },
    });

    await authorize('show', req.user, space);

    res.json(space);
  } catch (err) {
    next(err);
  }
});

export default router;
