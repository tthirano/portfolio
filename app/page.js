'use client';
import { useEffect, useRef } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import DownloadResume from './components/download';
import Pagination from './components/pagination';
import PageContent from './components/pagecontent';
import styles from './page.module.css';

export default function HomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!canvas || !context) return;

    let mouseX = 0.5;
    let mouseY = 0.5;
    let autoAngle = 0;
    let lastMouseMove = Date.now();
    let currentAngleX = 0.5;
    let currentAngleY = 0.5;
    let targetAngleX = 0.5;  
    let targetAngleY = 0.5;

    const handleMouseMove = (e) => {
      const newMouseX = e.clientX / window.innerWidth;
      const newMouseY = e.clientY / window.innerHeight;

      const isIdle = Date.now() - lastMouseMove > 500;

      if (Date.now() - lastMouseMove > 500) {
        mouseX = newMouseX;
        mouseY = newMouseY;
        targetAngleX = currentAngleX;
        targetAngleY = currentAngleY;
      }
      
      const dx = newMouseX - mouseX;
      const dy = newMouseY - mouseY;
      targetAngleY += dx * Math.PI * 2;
      targetAngleX -= dy * Math.PI;

      mouseX = newMouseX;
      mouseY = newMouseY;
      lastMouseMove = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      context.lineWidth = 2;
      context.strokeStyle = '#E8DEF8';
      context.fillStyle = '#ff918f';
      context.lineJoin = 'round';
      context.lineCap = 'round';
    };

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

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const idleMs = Date.now() - lastMouseMove;
      const isIdle = idleMs > 500; 

     if (isIdle) {
        targetAngleX = currentAngleX;
        targetAngleY += 0.01;  
      }

    currentAngleX += (targetAngleX - currentAngleX) * 0.05;
    currentAngleY += (targetAngleY - currentAngleY) * 0.05;

      const angleX = currentAngleX;
      const angleY = currentAngleY;

      const rot_x = [
      [1, 0, 0],
      [0, Math.cos(angleX), -Math.sin(angleX)],
      [0, Math.sin(angleX), Math.cos(angleX)],
      ];

      const rot_y = [
        [Math.cos(angleY), 0, Math.sin(angleY)],
        [0, 1, 0],
        [-Math.sin(angleY), 0, Math.cos(angleY)],
      ];

      const rot_z = [
        [Math.cos(angleX), -Math.sin(angleX), 0],
        [Math.sin(angleX), Math.cos(angleX), 0],
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

      const minSize = Math.min(window.innerWidth, window.innerHeight);
      const scale = 70;

      const pro_points = points.map((point) => {
        let rotated = dot(rot_z, reshape(point, 3));
        rotated = dot(rot_y, rotated);
        rotated = dot(rot_x, rotated);
        let projected = dot(pro_matrix, rotated);
        return [
          projected[0][0] * scale + window.innerWidth / 2,
          projected[1][0] * scale + window.innerHeight * 0.2
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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  
  }, []);
  return (
    <>
      <div className={styles.container}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <PageContent currentPage={1}>
          <div className={styles.content}>
            <Heading fontSize="4xl" fontFamily="'Courier New', monospace" color="#E8DEF8" textAlign="center">
              Hi, I'm Tyler Hirano
            </Heading>
            <Box mt={7}>
              <DownloadResume />
            </Box>
          </div>
        </PageContent>
        <div className={styles.pagination}>
          <Pagination currentPath="/" />
        </div>
      </div>
    </>
  );  
}

