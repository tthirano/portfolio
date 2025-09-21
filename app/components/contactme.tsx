'use client';

import { Box, Button, Input, Textarea, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBanner(null);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setBanner({ type: 'success', msg: 'Message sent!' });
        form.current?.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);        // <-- check console
        setBanner({
          type: 'error',
          msg: error?.text || `Failed to send (status ${error?.status ?? 'unknown'})`,
        });
      })
      .finally(() => setLoading(false));

  };

  return (
    <Box maxW="lg" mx="auto" mt={8} p={4}>
      {banner && (
        <Box
          mb={4}
          p={3}
          borderRadius="md"
          bg={banner.type === 'success' ? 'green.600' : 'red.600'}
          color="white"
          fontSize="sm"
        >
          {banner.msg}
        </Box>
      )}

      <form ref={form} onSubmit={sendEmail}>
        <VStack gap={4} align="stretch">
          <Box>
            <label htmlFor="user_name" style={{ display: 'block', marginBottom: 6, color: 'white' }}>Your Name</label>
            <Input id="user_name" name="user_name" required />
          </Box>

          <Box>
            <label htmlFor="user_email" style={{ display: 'block', marginBottom: 6, color: 'white' }}>Your Email</label>
            <Input id="user_email" name="user_email" type="email" required />
          </Box>

          <Box>
            <label htmlFor="message" style={{ display: 'block', marginBottom: 6, color: 'white'}}>Your Message</label>
            <Textarea id="message" name="message" rows={6} required />
          </Box>

          <Button type="submit" colorScheme="purple" loading={loading}>
            Send Message
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
