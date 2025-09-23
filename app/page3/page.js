'use client';
import { Box, Flex, Heading, SimpleGrid, Text, Stack } from '@chakra-ui/react';
import Pagination from '../components/pagination';
import PageContent from '../components/pagecontent';

export default function Page3() {
  const projects = [
    {
      title: 'Data Validation',
      description:
        'Data Validation Web App for Pacxa, featuring AI hybrid matching with fuzzy logic and embeddings to match company/product names',
      video: {
        mp4: '/videos2/FinalDemo.h264.mp4',
        webm: '/videos2/FinalDemo.vp9.webm',
      },
    },
    {
      title: 'Project 2',
      description: 'Short description of project 2.',
      video: null,
    },
    {
      title: 'Project 3',
      description: 'Short description of project 3.',
      video: null,
    },
    {
      title: 'Project 4',
      description: 'Short description of project 4.',
      video: null,
    },
    {
      title: 'Project 5',
      description: 'Short description of project 5.',
      video: null,
    },
    {
      title: 'Project 6',
      description: 'Short description of project 6.',
      video: null,
    },
  ];

  return (
    <>
      <PageContent pagenumber={3}>
        <Flex direction="column" minH="100vh" px={8} py={4}>
          <Box flex="1">
            {/* ✅ Heading restored */}
            <Heading
              as="h1"
              mb={8}
              fontFamily="var(--font-dm-sans)"
              fontSize="4xl"
              color="#E8DEF8"
            >
              Projects
            </Heading>

            {/* 🔽 Only show first 3 items */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {projects.slice(0, 3).map((proj, idx) => (
                <Box
                  key={idx}
                  bg="#1a1a1a"
                  borderRadius="xl"
                  p={4}
                  shadow="md"
                  transition="transform 0.2s"
                  _hover={{ transform: 'translateY(-4px)' }}
                >
                  {/* Media */}
                  {proj.video ? (
                    <Box
                      mb={3}
                      borderRadius="12px"
                      overflow="hidden"
                      position="relative"
                      pt="56.25%" // keep 16:9 aspect ratio
                    >
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      >
                        <source src={proj.video.mp4} type="video/mp4" />
                        <source src={proj.video.webm} type="video/webm" />
                        Sorry, your browser doesn’t support embedded videos.
                      </video>
                    </Box>
                  ) : (
                    <Box
                      mb={3}
                      h="180px"
                      borderRadius="12px"
                      bg="gray.700"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="gray.400"
                    >
                      Placeholder
                    </Box>
                  )}

                  {/* Text */}
                  <Stack spacing={2}>
                    <Heading as="h3" fontSize="lg" color="white" noOfLines={1}>
                      {proj.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.300" noOfLines={3}>
                      {proj.description}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </PageContent>

      {/* Pagination Footer */}
      <Flex justify="center" py={4}>
        <Pagination currentPage={3} />
      </Flex>
    </>
  );
}
