import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { Navbar, SideMenu } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
  imageFullPath?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
  children,
  imageFullPath,
  pageDescription,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
        {imageFullPath && <meta name='og:image' content={imageFullPath} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />

      <main
        style={{
          margin: '5rem auto',
          maxWidth: '1440px',
          padding: '0px 2rem',
        }}>
        {children}
      </main>

      <footer>{/* TODO CUSTOM FOOTER */}</footer>
    </>
  );
};
