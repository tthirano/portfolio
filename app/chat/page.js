'use client';
import { Box, Heading } from '@chakra-ui/react';
import Pagination from '../components/pagination';
import PageContent from '../components/pagecontent';
import styles from './page.module.css';

export default function Page5() {
  return (
    <>
      <div className={styles.container}>
        <PageContent pagenumber={5}>
          <Box px={8} py={4}>
            <Heading as="h1" mb={6} fontFamily="var(--font-dm-sans)" fontSize="4xl" color="#E8DEF8">
              AI Chat
            </Heading>
          </Box>
        </PageContent>
      </div>

      <div className={styles.pagination}>
        <Pagination currentPath="/contactme" />
      </div>
    </>    
  );
}