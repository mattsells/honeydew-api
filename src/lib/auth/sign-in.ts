import bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import db from '@/db';

export default function apply(passport: PassportStatic) {
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
        return done(null, false);
      }

      const isPasswordValid = await bcrypt.compare(password, user.encryptedPassword);

      if (!isPasswordValid) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
}
