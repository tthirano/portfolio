import './styles/globals.css';
import { Providers } from './components/providers';
import LoadingWrapper from './components/loadingwrapper';
import Pagination from './components/pagination';
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
            <div style={{ position: 'fixed', bottom: 16, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 30 }}>
              <Pagination />
            </div>
          </Providers>
        </LoadingWrapper>
        <Analytics />
      </body>
    </html>
  );
}
