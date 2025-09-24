"use client";

import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const MotionBox = motion(Box);

const skills = ["React", "Next.js", "MongoDB", "Python", "Azure", "Figma"];

const colors = [
  "purple.600",
  "blue.500",
  "green.500",
  "teal.400",
  "pink.500",
  "orange.400",
  "red.500",
];

type Skill = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

export default function SkillsBox() {
  const [positions, setPositions] = useState<Skill[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random positions/colors only on client
  useEffect(() => {
    const init: Skill[] = skills.map(() => ({
      x: Math.random() * 200,
      y: Math.random() * 150,
      vx: (Math.random() - 0.5) * 2.5,
      vy: (Math.random() - 0.5) * 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setPositions(init);
  }, []);

  // Bounce animation loop
  useEffect(() => {
    if (positions.length === 0) return;

    let animationFrame: number;

    const update = () => {
      setPositions((prev) =>
        prev.map((s) => {
          const boxWidth = containerRef.current?.offsetWidth || 300;
          const boxHeight = containerRef.current?.offsetHeight || 200;
          const badgeSize = 70;

          let { x, y, vx, vy, color } = s;

          x += vx;
          y += vy;

          if (x < 0 || x > boxWidth - badgeSize) vx *= -1;
          if (y < 0 || y > boxHeight - badgeSize) vy *= -1;

          x = Math.max(0, Math.min(x, boxWidth - badgeSize));
          y = Math.max(0, Math.min(y, boxHeight - badgeSize));

          return { x, y, vx, vy, color };
        })
      );

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [positions.length]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      w={{ base: "250px", md: "300px" }}
      h={{ base: "180px", md: "220px" }}
      mx="auto"
      border="2px solid #E8DEF8"
      borderRadius="lg"
      overflow="hidden"
      bg="rgba(255,255,255,0.02)"
    >
      <Heading
        as="h2"
        fontSize="xl"
        color="#E8DEF8"
        mb={2}
        fontFamily="var(--font-dm-sans)"
        textAlign="center"
      >
        Skills
      </Heading>

      {positions.map((s, i) => (
        <MotionBox
          key={skills[i]}
          position="absolute"
          px={3}
          py={1}
          borderRadius="md"
          bg={s.color}
          color="white"
          fontSize="sm"
          fontWeight="medium"
          animate={{ x: s.x, y: s.y }}
          transition={{ type: "tween", ease: "linear", duration: 0.05 }}
        >
          {skills[i]}
        </MotionBox>
      ))}
    </Box>
  );
}
