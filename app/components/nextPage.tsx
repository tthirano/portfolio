'use client';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageButton({ path, children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSelected = mounted && pathname === path;

  return (
    <Link href={path}>
      <Button
        borderRadius="full"
        size="sm"
        w="40px"
        h="40px"
        bg={isSelected ? '#c6bdd4ff' : '#555466'}
        color="white"
        _hover={{ bg: '#6A5B7C' }}
        opacity={mounted ? 1 : 0}
        transition="opacity 0.2s"
      >
        {children}
      </Button>
    </Link>
  );
}