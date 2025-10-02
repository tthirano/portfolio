// app/layout.js
import './styles/globals.css';
import { Providers } from './components/providers'; 

export const metadata = {
  title: 'Tyler Hirano',
  description: '',
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
