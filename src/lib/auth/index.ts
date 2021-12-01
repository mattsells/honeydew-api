import { PassportStatic } from 'passport';

import applyJwt from './jwt';
import applySignIn from './sign-in';
import applySignUp from './sign-up';

export default function applyAuthStrategies(passport: PassportStatic) {
  applyJwt(passport);
  applySignIn(passport);
  applySignUp(passport);
}
