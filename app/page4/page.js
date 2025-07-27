'use client';
import { Box, Flex, Heading, Text} from '@chakra-ui/react';
import Pagination from '../components/Pagination';
import PageContent from '../components/pagecontent';

export default function Page3() {
  return (
    <>
        <PageContent pagenumber={4}>
        <Flex direction="column" minHeight="100vh" justifyContent="space-between" px={8} py={4}>
          <Box>
            <Heading as="h1" mb={6} fontFamily="var(--font-dm-sans)" fontSize="4xl" color="#E8DEF8">Contact Me</Heading>
          </Box>
        </Flex>
        </PageContent>
        <Flex position="absolute" bottom="32px" width="100%" justify="center" zIndex={1}>
          <Pagination currentPage={4} />
        </Flex>
        </>
  );
}
