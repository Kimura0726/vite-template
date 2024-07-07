import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAuthenticated } from '@/utils/utils';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  }
});
