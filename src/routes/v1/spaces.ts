import { Router } from 'express';

import * as controller from '@/controllers/v1/spaces';

const router = Router();

router.get('/spaces', controller.index);
router.get('/spaces/:id', controller.get);
router.post('/spaces', controller.create);

export default router;
