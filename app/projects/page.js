'use client';
import { Box, Flex, Heading, SimpleGrid, Text, Stack } from '@chakra-ui/react';
import Pagination from '../components/pagination';
import PageContent from '../components/pagecontent';
import styles from './page.module.css';

export default function Page3() {
  const projects = [
    {
      title: 'Data Validation',
      description:
        'Data Validation Web App for Pacxa that automates comparison between ConnectWise, Partner Center, and C3 billing data, using hybrid AI matching (fuzzy + embeddings) to accurately match company and product names, reduce manual reconciliation work, and pricing inconsistencies.',
      video: {
        mp4: '/videos2/FinalDemo.h264.mp4',
        webm: '/videos2/FinalDemo.vp9.webm',
      },
    },
    {
      title: 'Talent Management App',
      description:
        'Talent Management App for Pacxa that centralizes employee skills, certifications, roles, and department information into a single searchable platform. Built to help HR, managers, and solution architects understand technical capability coverage, staffing gaps, and team specialization across the company.',
      video: {
        mp4: '/videos2/TMADemoFinal.h264.mp4',
        webm: '/videos2/TMADemoFinal.vp9.webm',
      },
    },
    { title: 'Coming Soon', description: '', video: null },
  ];

  return (
    <>
      <div className={styles.container}>
        <PageContent currentPage={3}>
          <Box flex="1" pl={6} pr={8} py={4}>
            <Heading
              as="h1"
              mb={8}
              fontFamily="var(--font-dm-sans)"
              fontSize="4xl"
              color="#E8DEF8"
            >
              Projects
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
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
                  {proj.video ? (
                    <Box
                      mb={3}
                      borderRadius="12px"
                      overflow="hidden"
                      position="relative"
                      pt="56.25%"
                    >
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        className={styles.video}
                      >
                        <source src={proj.video.mp4} type="video/mp4" />
                        <source src={proj.video.webm} type="video/webm" />
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
                    />
                  )}

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
        </PageContent>
      </div>

      <div className={styles.pagination}>
        <Pagination currentPath="/projects" />
      </div>
    </>
  );
}