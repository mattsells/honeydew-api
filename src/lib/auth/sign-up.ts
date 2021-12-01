import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import db from '@/db';

// TODO: Maybe use custom strategy instead to get data under 'user' key
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
