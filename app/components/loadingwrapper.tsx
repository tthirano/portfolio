'use client';
import { useState } from 'react';
import LoadingScreen from './loadingscreen';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {children}
    </>
  );
}