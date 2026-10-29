'use client';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

const pageOrder = ['/', '/aboutme', '/projects', '/contactme', '/chat'];

export default function PageContent({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const previousPath = window.sessionStorage.getItem('portfolio-page-path');
    const previousIndex = pageOrder.indexOf(previousPath);
    const currentIndex = pageOrder.indexOf(pathname);
    const element = contentRef.current;

    if (element && previousIndex !== -1 && currentIndex !== -1 && previousIndex !== currentIndex) {
      element.style.transform = `translateX(${currentIndex > previousIndex ? 48 : -48}px)`;
      element.style.opacity = '0.85';
      element.getBoundingClientRect();
      element.style.transition = 'transform 400ms ease-out, opacity 400ms ease-out';
      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';
    }

    window.sessionStorage.setItem('portfolio-page-path', pathname);
  }, [pathname]);

  return (
    <div ref={contentRef} style={{ position: 'relative', width: '100%' }}>
      {children}
    </div>
  );
}
