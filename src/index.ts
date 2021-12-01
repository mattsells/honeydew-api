import 'module-alias/register';

import express from 'express';
import passport from 'passport';

import errorDistributor from '@/lib/error/distributor';
import router from '@/routes';

const PORT = process.env.PORT || 3000;

const app = express();

// Initial middleware
app.use(express.json());
app.use(passport.initialize());

// Route declarations
app.use(router.auth);
app.use('/v1', router.v1);

// Error handling
app.use(errorDistributor);

app.listen(PORT, async () => {
  console.log(`⚡️Server⚡️: App listening on port ${PORT}`);
});
