import { createRestPolicy } from '@/lib/policies';

export default createRestPolicy({
  index: () => true,
});
