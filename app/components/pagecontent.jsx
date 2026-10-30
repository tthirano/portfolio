'use client';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

const pageOrder = ['/', '/aboutme', '/projects', '/contactme', '/chat'];

export default function PageContent({ children, transitionRefs = [] }) {
  const pathname = usePathname();
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const previousPath = window.sessionStorage.getItem('portfolio-page-path');
    const previousIndex = pageOrder.indexOf(previousPath);
    const currentIndex = pageOrder.indexOf(pathname);
    const elements = [contentRef.current, ...transitionRefs.map((ref) => ref.current)]
      .filter(Boolean);

    const hasPageChange = previousIndex !== -1 && currentIndex !== -1 && previousIndex !== currentIndex;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (elements.length && hasPageChange && !prefersReducedMotion) {
      const movingForward = currentIndex > previousIndex;
      const entryAngle = movingForward ? 90 : -90;
      const cubeTransform = (angle) =>
        `perspective(1400px) translateZ(calc(-50vw)) rotateY(${angle}deg) translateZ(50vw)`;

      elements.forEach((element) => {
        element.style.transformOrigin = 'center center';
        element.style.backfaceVisibility = 'hidden';
        // Position each face around the center of a virtual cube. This keeps
        // the face from moving toward the camera and appearing to enlarge.
        element.style.transform = cubeTransform(entryAngle);
        element.style.opacity = '1';
      });

      // Force the browser to paint the starting position before animating.
      elements[0].getBoundingClientRect();

      elements.forEach((element) => {
        element.style.willChange = 'transform, opacity';
        element.style.transition = 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1200ms ease-out';
        element.style.transform = cubeTransform(0);
        element.style.opacity = '1';
      });
    }

    window.sessionStorage.setItem('portfolio-page-path', pathname);
  }, [pathname]);

  return (
    <div ref={contentRef} style={{ position: 'relative', width: '100%' }}>
      {children}
    </div>
  );
}
