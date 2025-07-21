'use client';
import { Button } from '@chakra-ui/react';

const DownloadResume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.docx'; // Make sure this matches your actual file name
    link.setAttribute('download', 'Tyler_Hirano_Resume.docx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      bg="#555466"
      color="#E8DEF8"
      _hover={{ bg: '#6A5B7C' }}
      borderRadius="full"
    >
      Download Resume
    </Button>
  );
};

export default DownloadResume;
