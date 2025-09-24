'use client';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PageButton({ path, children }) {
  const pathname = usePathname();
  const isSelected = pathname === path;

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
      >
        {children}
      </Button>
    </Link>
  );
}
