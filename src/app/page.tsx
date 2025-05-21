'use client';

import dynamic from 'next/dynamic';

const Counter = dynamic(() => import('@/components/Counter'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Counter />
      </div>
    </main>
  );
}
