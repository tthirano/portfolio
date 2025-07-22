'use client';
import { HStack } from '@chakra-ui/react';
import PageButton from './nextPage';

export default function Pagination({ currentPage }) {
  return (
    <HStack spacing={4} mb={4} justify="center">
      {[1, 2, 3].map((page) => (
        <PageButton
          key={page}
          page={page}
          isSelected={currentPage === page}
        />
      ))}
    </HStack>
  );
}
