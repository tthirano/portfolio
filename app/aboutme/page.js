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
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './page.module.css';

export default function Page2() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  return (
    <>
      <div className={styles.container}>
        <PageContent currentPage={2}>
          <Box flex="1" pl={6} pr={8} py={4}>
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
                    with a Computer Science minor at Santa Clara University. I like building
                    tools that make systems easier to use and workflows more efficient. Always 
                    looking to work on problems where technology can make a real difference
                  </Text>
                  <Text fontSize="lg" color="gray.200">
                    I interned at Pacxa where I built a data validation app that cut manual
                    reconciliation time by 50%, worked on an AI pipeline for entity resolution,
                    and refactored a Power Apps talent management tool into a full Next.js web app.
                    I'm also currently building a website for Front Door Communities, a local nonprofit in San Jose.
                  </Text>
                  <Text fontSize="lg" color="gray.200">
                    Outside of class and tech, you'll find me at the gym, with my epic dog, spearfishing,
                    trying new recipes, playing piano or drums, or watching football.
                  </Text>
                </Stack>
                <Flex gap={4} mt={4} mb={4}>
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
                <Flex gap={3} pt={6} justify="center" mb={6}>
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
                        sizes="(max-width: 768px) 100px,
                              (max-width: 1200px) 150px,
                              230px"
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                </Flex>
              </Box>

              <Box
                w={{ base: '200px', md: '300px', lg: '400px' }}
                h={{ base: '200px', md: '300px', lg: '400px' }}
                position="relative"
                borderRadius="full"
                overflow="hidden"
                border="4px solid #E8DEF8"
                ml={{ base: 'auto', md: '60px', lg: '100px' }}
                mr={{ base: 'auto', md: '0' }}
                mt={{ base: 6, md: 0 }}
              >
                <NextImage
                  src="/me.jpg"
                  alt="Tyler Hirano"
                  fill
                  sizes="(max-width: 768px) 200px,
                        (max-width: 1200px) 300px,
                        400px"
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  priority
                />
              </Box>
            </Flex>
          </Box>
        </PageContent>
      </div>

      {selectedPhoto && (
        <div className={styles.lightbox} onClick={() => setSelectedPhoto(null)}>
          <div className={styles.lightboxImage}>
            <NextImage
              src={selectedPhoto}
              alt="Enlarged photo"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}

      <div className={styles.pagination}>
        <Pagination currentPath="/aboutme" />
      </div>
    </>
  );
}