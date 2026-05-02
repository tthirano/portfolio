// app/layout.js
import './styles/globals.css';
import { Providers } from './components/providers'; 
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'Tyler Hirano',
  description: 'Portfolio',
  icons: {
    icon: '/favicon_TH.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children} 
        </Providers>
      </body>
    </html>
  );
}
