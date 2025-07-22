'use client';
import { useEffect, useRef } from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import DownloadResume from './components/download';
import Pagination from './components/Pagination';

export default function HomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  if (!canvas || !context) return;

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
<<<<<<< HEAD
  };

=======

    context.lineWidth = 2;
    context.strokeStyle = '#E8DEF8';
    context.fillStyle = '#ff918f';
    context.lineJoin = 'round';
    context.lineCap = 'round';
  };


>>>>>>> 2bcd9f47502fba0d55012a43257c593e9c0a36c3
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  context.lineWidth = 2;
  context.strokeStyle = '#E8DEF8';
  context.fillStyle = '#ff918f';
  context.lineJoin = 'round';
  context.lineCap = 'round';

  const dot = (A, B) => {
    const result = Array(A.length).fill(null).map(() => Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < B[0].length; j++) {
        for (let k = 0; k < A[0].length; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return result;
  };

  const reshape = (point, x) => point.slice(0, x).map(v => [v]);

  const connect_points = (i, j, p) => {
    context.beginPath();
    context.moveTo(p[i][0], p[i][1]);
    context.lineTo(p[j][0], p[j][1]);
    context.stroke();
  };

  const fillPoints = (p) => {
    const faces = [
      [0, 1, 5, 4],
      [4, 5, 6, 7],
      [5, 1, 2, 6],
      [1, 2, 3, 0],
      [0, 3, 7, 4],
      [7, 6, 2, 3],
    ];

    for (const face of faces) {
      context.beginPath();
      face.forEach((idx, i) => {
        if (i === 0) context.moveTo(p[idx][0], p[idx][1]);
        else context.lineTo(p[idx][0], p[idx][1]);
      });
      context.closePath();
      context.fill();
    }
  };

  let frameId;
  let angle = 0;

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    angle += 0.005;

    const rot_x = [
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle), Math.cos(angle)],
    ];

    const rot_y = [
      [Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)],
    ];

    const rot_z = [
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1],
    ];

    const points = [
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    ];

    const pro_matrix = [
      [1, 0, 0],
      [0, 1, 0],
    ];

<<<<<<< HEAD
=======
    const minSize = Math.min(window.innerWidth, window.innerHeight);
>>>>>>> 2bcd9f47502fba0d55012a43257c593e9c0a36c3
    const scale = 70;

    const pro_points = points.map((point) => {
      let rotated = dot(rot_z, reshape(point, 3));
      rotated = dot(rot_y, rotated);
      rotated = dot(rot_x, rotated);
      let projected = dot(pro_matrix, rotated);
      return [
<<<<<<< HEAD
        projected[0][0] * scale + canvas.width / 2,    
        projected[1][0] * scale + canvas.height * 0.2  
=======
        projected[0][0] * scale + window.innerWidth / 2,
        projected[1][0] * scale + window.innerHeight * 0.2
>>>>>>> 2bcd9f47502fba0d55012a43257c593e9c0a36c3
      ];
    });

    fillPoints(pro_points);
    for (let i = 0; i < 4; i++) {
      connect_points(i, (i + 1) % 4, pro_points);
      connect_points(i + 4, ((i + 1) % 4) + 4, pro_points);
      connect_points(i, i + 4, pro_points);
    }

    frameId = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resizeCanvas);
  };
  
  }, []);
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Flex direction="column" align="center" justify="center" minHeight="100vh" px={8} zIndex={1}>
        <Heading fontSize="4xl" color="#E8DEF8" textAlign="center">
          Hi, I'm Tyler Hirano
        </Heading>
        <Text fontSize="lg" color="gray.300" mt={3} textAlign="center">
           description
        </Text>
        <Box mt={2}>
          <DownloadResume />
        </Box>
      </Flex>
      <Flex position="absolute" bottom="32px" width="100%" justify="center" zIndex={1}>
        <Pagination currentPage={1} />
      </Flex>
    </>
  );
}

/*MIS Student & Aspiring Software Developer passionate about AI and Data Analysis.*/