import { Router } from 'express';

import healthChecks from './health';
import spaces from './spaces';

const router = Router();

router.use(spaces);
router.use(healthChecks);

export default router;
