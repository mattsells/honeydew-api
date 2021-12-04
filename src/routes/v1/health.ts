import { Router } from 'express';

import ServerError from '@/lib/error/ServerError';

const router = Router();

// Server health check routes
router.get('/health', (req, res) => {
  res.json({ success: true });
});

router.get('/protected', (req, res) => {
  res.json({ success: true });
});

router.get('/error', () => {
  throw new ServerError('You can\'t do that', 500);
});

export default router;
