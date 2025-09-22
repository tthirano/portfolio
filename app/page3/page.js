'use client';
import { Box, Flex, Heading, SimpleGrid, Text, Stack } from '@chakra-ui/react';
import Pagination from '../components/pagination';
import PageContent from '../components/pagecontent';

export default function Page3() {
  // Project data (video + title + description)
  const projects = [
    {
      title: 'Data Validation',
      description:
        'AI-powered Data Validation Web App for Pacxa, featuring hybrid matching with fuzzy logic and embeddings to ',
      video: {
        mp4: '/videos2/FinalDemo.h264.mp4',
        webm: '/videos2/FinalDemo.vp9.webm',
      },
    },
    {
      title: 'Project 2',
      description: 'Short description of project 2.',
      video: null, // can replace with image or another video
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
              mb={10}
              fontFamily="var(--font-dm-sans)"
              fontSize="4xl"
              color="#E8DEF8"
            >
              Projects
            </Heading>

            {/* 🔽 Projects Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {projects.map((proj, idx) => (
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
                      pt="56.25%" // 16:9 ratio
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
                          objectFit: 'contain', // or 'cover'
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
                    <Heading as="h3" fontSize="xl" color="white">
                      {proj.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.300">
                      {proj.description}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </PageContent>

      {/* 🔽 Pagination stays fixed at bottom */}
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
