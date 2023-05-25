import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Error404() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
