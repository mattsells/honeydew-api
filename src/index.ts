import 'module-alias/register';

import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '@/db';
import ServerError from '@/lib/ServerError';

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || '';

const app = express();

app.use(express.json());
app.use(passport.initialize());

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

passport.use(new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    return done(error);
  }
}));

app.post('/sign_up', passport.authenticate('sign-up', { session: false }), (req, res) => {
  res.json(req.user);
});

app.post('/sign_in', async (req, res, next) => {
  passport.authenticate('sign-in', async (err, user) => {
    try {
      if (err || !user) {
        return next(new Error('An error occurred'));
      }

      req.login(user, { session: false }, async (e) => {
        if (e) {
          return next(e);
        }

        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, JWT_SECRET);

        res.set('Authorization', `Bearer ${token}`);

        // TODO: remove password details from user (create serializers?)
        return res.json({ user });
      });
    } catch (e) {
      return next(e);
    }

    return next();
    // NOTE: passport.authenticate creates a function, normally to be used as middleware
    // It must be immediately invoked with req, res, and next to be used
  })(req, res, next);
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ success: true });
});

app.get('/health', (req, res) => {
  res.json({ success: true });
});

app.get('/error', (req, res, next) => {
  next(new ServerError('You can\'t do that', 403));
});

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
