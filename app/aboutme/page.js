'use client';
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
                    I'm a Management Information Systems student with a Computer Science minor at 
                    Santa Clara University, with an interest in building technology that solves 
                    real-world problems. I enjoy the combination of problem-solving, creativity, 
                    and continuous learning that comes with developing software and finding better 
                    ways to make systems and workflows more efficient. 
                  </Text>
                  <Text fontSize="lg" color="gray.200"> 
                    Through my internships at Pacxa, I've had the opportunity to work on projects 
                    ranging from AI-powered data validation and entity resolution to a workforce development 
                    platform for the U.S. Department of Education's Connecting Talent to Opportunity Challenge. 
                    I'm interested in the space where technology and business meet, and I'm always looking for 
                    opportunities to learn, build, and solve meaningful problems. 
                  </Text>
                  <Text fontSize="lg" color="gray.200">
                    Outside of class and tech, you'll find me at the gym, with my dog, spearfishing,
                    trying new recipes, or watching football.
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
                      transition="transform 0.2s, opacity 0.2s"
                      _hover={{ transform: 'scale(1.08)', opacity: 0.85 }}
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
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  priority
                />
              </Box>
            </Flex>
          </Box>
        </PageContent>
      </div>

      <div className={styles.pagination}>
        <Pagination currentPath="/aboutme" />
      </div>
    </>
  );
}
