'use client';
import { HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageButton from './nextPage';

// Lucide icons
import { Home, User, FolderKanban, Mail } from 'lucide-react';

const icons = [
  { path: '/', icon: Home },
  { path: '/aboutme', icon: User },
  { path: '/projects', icon: FolderKanban },
  { path: '/contactme', icon: Mail },
];

export default function Pagination({ currentPath }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/aboutme');
    router.prefetch('/projects');
    router.prefetch('/contactme');
  }, [router]);

  return (
    <HStack spacing={4} mb={4} justify="center">
      {icons.map(({ path, icon: Icon }) => (
        <PageButton key={path} path={path} isSelected={currentPath === path}>
          <Icon size={20} />
        </PageButton>
      ))}
    </HStack>
  );
}
