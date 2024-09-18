
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RoutePageProps {
  params: {
    route: string;
  };
}

export default function RoutePage({ params }: RoutePageProps) {
  const router = useRouter();
  const { route } = params;

  useEffect(() => {
    if (route.startsWith('schedule')) {
      router.replace('/schedule');
    }
  }, [route, router]);

  return null;
}
