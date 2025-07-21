'use client';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function PageButton({ page, isSelected }) {
  const router = useRouter();

  const handleClick = () => {
    if (page === 1) {
      router.push('/'); // Homepage
    } else {
      router.push(`/page${page}`);
    }
  };

  return (
    <Button
      onClick={handleClick}
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
  );
}
