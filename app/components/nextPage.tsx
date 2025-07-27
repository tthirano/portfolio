'use client';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function PageButton({ page, isSelected }) {
  const href = page === 1 ? '/' : `/page${page}`;

  return (
    <Link href={href}>
      <Button
        borderRadius="full"
        size="sm"
        w="40px"
        h="40px"
        bg={isSelected ? '#E8DEF8' : '#555466'}
        color="white"
        _hover={{ bg: '#6A5B7C' }}
      >
        {page}
      </Button>
    </Link>
  );
}
