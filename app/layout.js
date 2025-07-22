// app/layout.js
import './styles/globals.css';
import { Providers } from './components/providers'; 

export const metadata = {
  title: 'My App',
  description: 'Awesome stuff here',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children} {/* ✅ children will render your <Flex> etc inside <body> */}
        </Providers>
      </body>
    </html>
  );
}
