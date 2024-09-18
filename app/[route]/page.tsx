// Next.js 접근 경로 중 마지막 경로가 schedule 로 시작하면 /coffee-chat/schedule 로 리다이렉트
import { redirect } from 'next/navigation';

export default function RoutePage({ params }: { params: { route: string } }) {
  const { route } = params;

  if (route.startsWith('schedule')) {
    redirect('/schedule');
  }

  return (
    <div>
      {/* 해당 route에 대한 콘텐츠 */}
      <h1>Route: {route}</h1>
    </div>
  );
}
