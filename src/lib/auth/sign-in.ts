import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import db from '@/db';

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
