'use client';
import { Box, Flex, Heading } from '@chakra-ui/react';
import Pagination from '../components/pagination';
import PageContent from '../components/pagecontent';

export default function Page3() {
  return (
    <>
      <PageContent pagenumber={3}>
        <Flex
          direction="column"
          minHeight="100vh"
          justifyContent="space-between"
          px={8}
          py={4}
        >
          <Box>
            <Heading
              as="h1"
              mb={6}
              fontFamily="var(--font-dm-sans)"
              fontSize="4xl"
              color="#E8DEF8"
            >
              Projects
            </Heading>
          </Box>

          {/* 🔽 Middle-left video */}
          <Flex flex="1" align="center" justify="flex-start">
            <Box maxW="600px">
              <video
                controls
                playsInline
                preload="metadata"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  background: '#000',
                }}
              >
                <source
                  src="/videos2/FinalDemo.h264.mp4"
                  type="video/mp4"
                />
                <source
                  src="/videos2/FinalDemo.vp9.webm"
                  type="video/webm"
                />
                Sorry, your browser doesn’t support embedded videos.
              </video>
            </Box>
          </Flex>
        </Flex>
      </PageContent>

      <Flex
        position="absolute"
        bottom="32px"
        width="100%"
        justify="center"
        zIndex={1}
      >
        <Pagination currentPage={3} />
      </Flex>
    </>
  );
}
