'use client';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const MotionBox = motion.create(Box);

export default function PageContent({ currentPage, children }) {
  return (
    <MotionBox
      key={currentPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      position="relative"
    >
      {children}
    </MotionBox>
  );
}