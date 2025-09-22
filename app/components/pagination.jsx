'use client';
import { HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageButton from './nextPage';

// Lucide icons
import { Home, User, FolderKanban, Mail } from 'lucide-react';

const icons = [
  { page: 1, icon: Home },
  { page: 2, icon: User },
  { page: 3, icon: FolderKanban },
  { page: 4, icon: Mail },
];

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
      {icons.map(({ page, icon: Icon }) => (
        <PageButton key={page} page={page} isSelected={currentPage === page}>
          <Icon size={20} />
        </PageButton>
      ))}
    </HStack>
  );
}
