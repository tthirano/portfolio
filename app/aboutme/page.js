'use client';
import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import Pagination from '../components/pagination';
import PageContent from '../components/pagecontent';
import SkillsBox from '../components/skillsbox';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Page2() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  return (
    <>
      <PageContent currentPage={2}>
        <Flex direction="column" minHeight="100vh" position="relative">
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
              align="stretch"
              gap={0}
            >
              {/* Left: Text Section */}
              <Box w={{ base: '100%', md: '50%' }}>
                <Stack spacing={4}>
                  <Text fontSize="lg" color="gray.200">
                    Hi, I'm <b>Tyler Hirano</b>, a Management Information Systems student
                    with a Computer Science minor at Santa Clara University, expected to
                    graduate in 2027.
                  </Text>
                  <Text fontSize="lg" color="gray.200">
                    I've built full-stack web apps using <b>Next.js</b>, <b>React</b>,{' '}
                    <b>MongoDB</b>, and <b>Python</b>, including a Data Validation tool and
                    Talent Management platform for Pacxa that used AI-driven pipelines to
                    help account managers work faster and smarter.
                  </Text>
                  <Text fontSize="lg" color="gray.200">
                    Outside of class and tech, you'll find me at the gym, at the beach spearfishing, in the kitchen
                    trying new recipes, playing piano or drums, or watching football.
                  </Text>
                </Stack>
                <Box mt={6}>
                  <Flex gap={4} mt={6}>
                    <Box
                      as="a"
                      href="https://www.linkedin.com/in/tyler-hirano-3748b1297/"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="#E8DEF8"
                      _hover={{ color: 'blue.400' }}
                      fontSize="2xl"
                    >
                      <FaLinkedin />
                    </Box>
                    <Box
                      as="a"
                      href="https://github.com/tthirano"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="#E8DEF8"
                      _hover={{ color: 'gray.400' }}
                      fontSize="2xl"
                    >
                      <FaGithub />
                    </Box>
                  </Flex>
                </Box>
                <SkillsBox />
                {/* Thumbnail Row */}
                <Flex gap={3} mt="auto" pt={6} justify="center">
                    {['/me2.jpg', '/me3.jpg', '/me4.jpg'].map((src, i) => (
                      <Box
                        key={i}
                        w="230px"
                        h="170px"
                        position="relative"
                        borderRadius="md"
                        overflow="hidden"
                        border="2px solid #E8DEF8"
                        cursor="pointer"
                        transition="transform 0.2s, opacity 0.2s"
                        _hover={{ transform: 'scale(1.08)', opacity: 0.85 }}
                        onClick={() => setSelectedPhoto(src)}
                      >
                        <NextImage
                          src={src}
                          alt={`Photo ${i + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>
                    ))}
                  </Flex>
              </Box>

              {/* Right: Large Photo */}
              <Box
                w={{ base: '500px', md: '550px' }}
                h={{ base: '500px', md: '550px' }}
                position="relative"
                borderRadius="full"
                overflow="hidden"
                border="4px solid #E8DEF8"
                ml="200px"
              >
                <NextImage
                  src="/me.jpg"
                  alt="Tyler Hirano"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  priority
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </PageContent>

      {/* Lightbox Overlay */}
      {selectedPhoto && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.800"
          zIndex={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setSelectedPhoto(null)}
          cursor="pointer"
        >
          <Box
            position="relative"
            w="500px"
            h="500px"
            borderRadius="lg"
            overflow="hidden"
            border="4px solid #E8DEF8"
          >
            <NextImage
              src={selectedPhoto}
              alt="Enlarged photo"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Box>
      )}

      <Flex position="absolute" bottom="32px" width="100%" justify="center">
        <Pagination currentPage={2} />
      </Flex>
    </>
  );
}