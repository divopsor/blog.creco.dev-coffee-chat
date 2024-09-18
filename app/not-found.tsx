
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Error from 'next/error';

interface RoutePageProps {
  params: {
    route: string;
  };
}

export default function RoutePage({ params }: RoutePageProps) {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname.startsWith('/coffee-chat/schedule')) {
      router.replace('/schedule');
    }
  }, [router]);

  return <Error statusCode={404} />
}
