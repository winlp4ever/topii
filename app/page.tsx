'use client';
import React from 'react';
import Head from 'next/head';
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from './store';
import { WelcomeWindow } from './components/welcome-window';
import { MainWindow } from './components/main-window';


const queryClient = new QueryClient();


const Home: React.FC = () => {
  const corpusId = useAppStore((state) => state.corpusId);

  return (
    <QueryClientProvider client={queryClient}>
      <div >
        <Head>
          <title>Topic Modeling Demo</title>
          <meta name="description" content="A simple topic modeling graph application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {!corpusId ? <WelcomeWindow /> : <MainWindow />}
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Home;