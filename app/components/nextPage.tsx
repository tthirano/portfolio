'use client';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './pagecontent.module.css';

const pageOrder = ['/', '/aboutme', '/projects', '/contactme', '/chat'];

function showOutgoingFace(movingForward: boolean) {
  const currentPage = document.querySelector('[data-page-transition-root]');
  if (!currentPage) return;

  const outgoingFace = currentPage.cloneNode(true) as HTMLElement;
  outgoingFace.removeAttribute('data-page-transition-root');
  outgoingFace.setAttribute('aria-hidden', 'true');
  outgoingFace.classList.add(
    styles.outgoingFace,
    movingForward ? styles.forward : styles.backward,
  );

  // Cloned canvases do not retain their pixels. A display-resolution snapshot
  // is sharp enough for this short animation and avoids copying a large DPR canvas.
  const sourceCanvases = currentPage.querySelectorAll('canvas');
  const clonedCanvases = outgoingFace.querySelectorAll('canvas');
  sourceCanvases.forEach((sourceCanvas, index) => {
    const clonedCanvas = clonedCanvases[index];
    const context = clonedCanvas?.getContext('2d');
    if (!clonedCanvas || !context) return;

    const { width, height } = sourceCanvas.getBoundingClientRect();
    clonedCanvas.width = Math.max(1, Math.round(width));
    clonedCanvas.height = Math.max(1, Math.round(height));
    context.drawImage(sourceCanvas, 0, 0, clonedCanvas.width, clonedCanvas.height);
  });

  document.body.appendChild(outgoingFace);
  outgoingFace.addEventListener('animationend', () => outgoingFace.remove(), { once: true });
  window.setTimeout(() => outgoingFace.remove(), 1300);
}

export default function PageButton({ path, children }) {
  const pathname = usePathname();
  const isSelected = pathname === path;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      pathname === path ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const previousIndex = pageOrder.indexOf(pathname);
    const nextIndex = pageOrder.indexOf(path);
    if (previousIndex !== -1 && nextIndex !== -1) {
      showOutgoingFace(nextIndex > previousIndex);
    }
  };

  return (
    <Link href={path} onClick={handleClick}>
      <Button
        borderRadius="full"
        size="sm"
        w="40px"
        h="40px"
        bg={isSelected ? '#c6bdd4ff' : '#555466'}
        color="white"
        _hover={{ bg: '#6A5B7C' }}
        opacity={1}
        transition="opacity 0.4s"
      >
        {children}
      </Button>
    </Link>
  );
}
