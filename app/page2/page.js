'use client';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import Pagination from '../components/pagination';
import PageContent from '../components/pagecontent';

export default function Page2() {
  return (
    <>
      <PageContent currentPage={2}>
        {/* Sticky footer structure */}
        <Flex direction="column" minHeight="100vh">
          {/* Main Content */}
          <Box flex="1" px={8} py={8}>
            <Heading
              as="h1"
              mb={10}
              fontFamily="var(--font-dm-sans)"
              fontSize="4xl"
              color="#E8DEF8"
            >
              About Me
            </Heading>

            <Flex
              direction={{ base: 'column', md: 'row' }}
              align="flex-start"
              gap={12}
            >
              {/* Left: Text Section */}
              <Box flex="1" maxW="3xl">
                <Stack spacing={4}>
                  <Text fontSize="lg" color="gray.200">
                    Hi, I’m <b>Tyler Hirano</b>, a Management Information
                    Systems student with a Computer Science minor at Santa Clara
                    University. I love building software solutions that blend
                    business insight with technical depth.
                  </Text>
                  <Text fontSize="lg" color="gray.200">
                    Recently, I’ve worked on projects like the{' '}
                    <b>Data Validation</b> and <b>Talent Management Web Apps</b>{' '}
                    for Pacxa, where I combined AI-driven matching pipelines,
                    MongoDB, and a Next.js + Chakra UI frontend to help account
                    managers save time and improve accuracy.
                  </Text>
                  <Text fontSize="lg" color="gray.200">
                    I’m passionate about programming, repairing computers and
                    devices, and working with AI. Outside of tech, I enjoy
                    football, lifting, cooking, piano, and drums.
                  </Text>
                </Stack>
              </Box>

              {/* Right: Profile + Skills */}
              <Box flexShrink={0} textAlign="center">
                <NextImage
                  src="/me.jpg"
                  alt="Tyler Hirano"
                  width={220}
                  height={220}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 1.5rem',
                    border: '4px solid #E8DEF8',
                  }}
                />

                <Heading
                  as="h2"
                  fontSize="xl"
                  color="#E8DEF8"
                  mb={4}
                  fontFamily="var(--font-dm-sans)"
                >
                  Skills
                </Heading>
                <SimpleGrid columns={3} spacing={3} maxW="220px" mx="auto">
                  {[
                    'React',
                    'Next.js',
                    'MongoDB',
                    'Python',
                    'Azure',
                    'Figma',
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      colorScheme="purple"
                      textAlign="center"
                      py={1}
                      px={2}
                      borderRadius="md"
                    >
                      {skill}
                    </Badge>
                  ))}
                </SimpleGrid>
              </Box>
            </Flex>
          </Box>

          {/* Pagination Footer */}
          <Flex justify="center" py={4}>
            <Pagination currentPage={2} />
          </Flex>
        </Flex>
      </PageContent>
    </>
  );
}
