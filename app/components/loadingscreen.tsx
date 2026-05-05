'use client';
import { useEffect, useState } from 'react';
import styles from './loadingscreen.module.css';

const lines = [
  { text: '> initializing portfolio...', delay: 0 },
  { text: '> establishing connection...', delay: 1000 },
  { text: '> welcome to tylerhirano.me', delay: 2000 },
];

const LAST_LINE_DELAY = 1200; 
const FADE_DURATION = 800;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers = lines.map(({ text, delay }) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, text]);
      }, delay)
    );

    const lastLineTime = lines[lines.length - 1].delay;
    const fadeTimer = setTimeout(() => setFading(true), lastLineTime + LAST_LINE_DELAY);
    const doneTimer = setTimeout(onComplete, lastLineTime + LAST_LINE_DELAY + FADE_DURATION);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.container} ${fading ? styles.fading : ''}`}>
      <div className={styles.terminal}>
        {visibleLines.map((line, i) => (
          <div key={i} className={styles.line}>
            <span className={styles.text}>{line}</span>
            {i === visibleLines.length - 1 && <span className={styles.cursor}>▋</span>}
          </div>
        ))}
      </div>
    </div>
  );
}