'use client';
import { useState, useRef, useEffect } from 'react';
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
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (!contentRef.current) return;
      if (window.innerWidth < 768) {
        contentRef.current.style.transform = 'none';
        return;
      }
      const scaleX = window.innerWidth / 1280;
      const scaleY = window.innerHeight / 800;
      const scale = Math.min(scaleX, scaleY, 1);
      contentRef.current.style.transform = `scale(${scale})`;
      contentRef.current.style.transformOrigin = 'top left';
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  return (
    <>
      <PageContent currentPage={2}>
        <Flex direction="column" maxHeight="calc(100vh - 80px)" overflowY="auto">
          <Box ref={contentRef} flex="1" pl={6} pr={8} py={4} pb="80px">
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
              <Box w={{ base: '100%', md: '50%' }}>
                <Stack spacing={4}>
                  <Text fontSize="lg" color="gray.200">
                    Hi, I'm <b>Tyler Hirano</b>, a Management Information Systems student
                    with a Computer Science minor at Santa Clara University, expected to
                    graduate in 2027.
                  </Text>
                  <Text fontSize="lg" color="gray.200">
                    I've built full-stack web apps using Next.js, React,{' '}
                    MongoDB, and Python, including a Data Validation tool and
                    Talent Management platform for Pacxa that used AI-driven pipelines to
                    help account managers streamline their work
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
                    {['/me2.jpg', '/me3.jpg', '/me4.JPG'].map((src, i) => (
                      <Box
                        key={i}
                        w={{ base: '100px', md: '150px', lg: '230px' }}
                        h={{ base: '80px', md: '110px', lg: '170px' }}
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

              <Box
                w={{ base: '280px', md: '400px', lg: '550px' }}
                h={{ base: '280px', md: '400px', lg: '550px' }}
                position="relative"
                borderRadius="full"
                overflow="hidden"
                border="4px solid #E8DEF8"
                ml={{ base: 'auto', md: '60px', lg: '100px' }}
                mr={{ base: 'auto', md: '0' }}
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
      <Flex position="fixed" bottom="32px" width="100%" justify="center" zIndex={1}>
        <Pagination currentPath="/aboutme" />
      </Flex>
    </>
  );
}