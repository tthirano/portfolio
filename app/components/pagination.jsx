'use client';
import { HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageButton from './nextPage';

export default function Pagination({ currentPage }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/page2');
    router.prefetch('/page3');
    router.prefetch('/page4');
  }, [router]);
  
  return (
    <HStack spacing={4} mb={4} justify="center">
      {[1, 2, 3, 4].map((page) => (
        <PageButton
          key={page}
          page={page}
          isSelected={currentPage === page}
        />
      ))}
    </HStack>
  );
}
