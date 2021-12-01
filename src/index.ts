import 'module-alias/register';

import express from 'express';
import passport from 'passport';

import ServerError from '@/lib/error/ServerError';
import router from '@/routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(router.auth);
app.use('/v1', router.v1);

// How to handle errors
app.use((
  error: ServerError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(error.status);
  res.json({ error: error.message });

  return next();
});

app.listen(PORT, async () => {
  console.log(`⚡️Server⚡️: App listening on port ${PORT}`);
});
