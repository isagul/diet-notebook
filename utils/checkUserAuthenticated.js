import { getSession } from 'next-auth/react';

import { ROUTES } from '@/constants/routes';

const checkUserAuthenticated = async (context, callback) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: ROUTES.APP_PAGE,
        permanent: false,
      },
    };
  }

  return callback();
};

export default checkUserAuthenticated;
