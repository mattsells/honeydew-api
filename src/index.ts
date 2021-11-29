import 'module-alias/register';

import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import db from '@/db';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(passport.initialize());

passport.use('sign-up', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        encryptedPassword,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
}));

passport.use('sign-in', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return done(null, false, { message: 'User with provided email address does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.encryptedPassword);

    if (!isPasswordValid) {
      return done(null, false, { message: 'Password does not match' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

app.post('/sign_up', passport.authenticate('sign-up', { session: false }), (req, res) => {
  res.json(req.user);
});

// app.post('/sign_in', passport.authenticate('sign-in'), (req, res) => {

// });

app.get('/health', (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, async () => {
  console.log(`⚡️Server⚡️: App listening on port ${PORT}`);
});
