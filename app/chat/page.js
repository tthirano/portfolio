'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  VStack,
  Text,
  Heading,
} from '@chakra-ui/react';

import Pagination from '../components/pagination';
import PageContent from '../components/pagecontent';
import styles from './page.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi, I'm Tyler's AI assistant. Ask me anything about my experience, projects, or skills.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong.' },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <div className={styles.container}>
        <PageContent pagenumber={3}>
          <Box px={8} py={4}>
            <Heading
              as="h1"
              mb={6}
              fontFamily="var(--font-dm-sans)"
              fontSize="4xl"
              color="#E8DEF8"
            >
              Chat With Me
            </Heading>

            {/* Chat Box */}
            <Box
              bg="#1a1d24"
              borderRadius="lg"
              p={4}
              h="500px"
              overflowY="auto"
              mb={4}
            >
              <VStack spacing={4} align="stretch">
                {messages.map((msg, i) => (
                  <Flex
                    key={i}
                    justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                  >
                    <Box
                      maxW="70%"
                      px={4}
                      py={3}
                      borderRadius="lg"
                      bg={msg.role === 'user' ? 'blue.500' : 'gray.700'}
                    >
                      <Text fontSize="sm">{msg.content}</Text>
                    </Box>
                  </Flex>
                ))}
                <div ref={bottomRef} />
              </VStack>
            </Box>

            {/* Input */}
            <Flex gap={2}>
              <Input
                placeholder="Ask about my projects, experience..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                bg="gray.800"
                border="none"
                _focus={{ border: '1px solid #E8DEF8' }}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                isLoading={loading}
                bg="#E8DEF8"
                color="black"
                _hover={{ opacity: 0.9 }}
              >
                Send
              </Button>
            </Flex>
          </Box>
        </PageContent>
      </div>

      <div className={styles.pagination}>
        <Pagination currentPath="/chat" />
      </div>
    </>
  );
}