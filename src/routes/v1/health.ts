import { Router } from 'express';
import passport from 'passport';

import ServerError from '@/lib/error/ServerError';

const router = Router();

// Server health check routes
router.get('/health', (req, res) => {
  res.json({ success: true });
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ success: true });
});

router.get('/error', () => {
  throw new ServerError('You can\'t do that', 403);
});

export default router;
