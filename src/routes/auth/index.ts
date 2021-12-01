import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import applyAuthStrategies from '@/lib/auth';

applyAuthStrategies(passport);

const JWT_SECRET = process.env.JWT_SECRET || '';

const router = Router();

router.post('/sign_up', passport.authenticate('sign-up', { session: false }), (req, res) => {
  res.json(req.user);
});

router.post('/sign_in', async (req, res, next) => {
  passport.authenticate('sign-in', async (err, user) => {
    try {
      if (err || !user) {
        return next(new Error('An error occurred'));
      }

      req.login(user, { session: false }, async (e) => {
        if (e) {
          return next(e);
        }

        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, JWT_SECRET);

        res.set('Authorization', `Bearer ${token}`);

        // TODO: remove password details from user (create serializers?)
        return res.json({ user });
      });
    } catch (e) {
      return next(e);
    }

    return next();
    // NOTE: passport.authenticate creates a function, normally to be used as middleware
    // It must be immediately invoked with req, res, and next to be used
  })(req, res, next);
});

export default router;
