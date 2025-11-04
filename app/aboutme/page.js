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
import SkillsBox from '../components/skillsbox';

export default function Page2() {
  return (
    <>
      <PageContent currentPage={2}>
        <Flex direction="column" minHeight="100vh" position="relative">
          {/* Main Content with extra bottom padding */}
          <Box flex="1" px={8} py={4} pb="120px">
            <Heading
              as="h1"
              mb={8}
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
                    Hi, my name is <b>Tyler Hirano</b>, a Management Information
                    Systems student with a Computer Science minor at Santa Clara
                    University.
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
                <Box
                  mx="auto"
                  mb={6}
                  border="4px solid #E8DEF8"
                  borderRadius="full"
                  overflow="hidden"
                  w={{ base: "150px", md: "220px" }}
                  h={{ base: "150px", md: "220px" }}
                  position="relative"
                >
                  <NextImage
                    src="/me.jpg"
                    alt="Tyler Hirano"
                    fill   
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 30%", 
                    }}
                    sizes="(max-width: 768px) 150px, 220px"
                    priority
                  />
                </Box>
                <SkillsBox />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </PageContent>

      <Flex position="absolute" bottom="32px" width="100%" justify="center">
        <Pagination currentPage={2} />
      </Flex>
    </>
  );
}
