import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Metal } from 'next/font/google';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/components/hocs/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '800'],
  variable: '--font-jakarta'
});

const metal = Metal({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-metal'
});

export const metadata: Metadata = {
  title: 'Lobe AI',
  description: 'Database query for with natural language for everyday business people'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter?.variable} ${jakarta?.variable} ${metal?.variable}`}>
        <NextTopLoader
          color="#24B361"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FFD60A,0 0 5px #FFD60A"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
