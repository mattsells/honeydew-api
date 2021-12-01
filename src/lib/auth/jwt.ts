import { PassportStatic } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const JWT_SECRET = process.env.JWT_SECRET || '';

export default function apply(passport: PassportStatic) {
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
}
