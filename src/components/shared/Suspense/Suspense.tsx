import { Suspense as ReactSuspense, type ReactNode } from 'react';

interface SuspenseProps {
  children: ReactNode;
}

const Suspense = ({ children }: SuspenseProps) => {
  return <ReactSuspense fallback={<div>Loading...</div>}>{children}</ReactSuspense>;
};

export default Suspense;
