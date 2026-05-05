import './styles/globals.css';
import { Providers } from './components/providers';
import LoadingWrapper from './components/loadingwrapper';
import { Analytics } from "@vercel/analytics/next";

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
        <LoadingWrapper>
          <Providers>
            {children}
          </Providers>
        </LoadingWrapper>
        <Analytics />
      </body>
    </html>
  );
}