import 'module-alias/register';

import express from 'express';
import morgan from 'morgan';
import passport from 'passport';

import errorDistributor from '@/lib/error/distributor';
import * as router from '@/routes';

const PORT = process.env.PORT || 3000;

const app = express();

// Initial middleware
app.use(express.json());
app.use(passport.initialize());
app.use(morgan('short'));

// Route declarations
app.use(router.auth);
app.use('/v1', passport.authenticate('jwt', { session: false }), router.v1);

// Error handling
app.use(errorDistributor);

app.listen(PORT, async () => {
  console.log(`⚡️Server⚡️: App listening on port ${PORT}`);
});
