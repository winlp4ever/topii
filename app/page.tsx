'use client';

import React from 'react';
import Head from 'next/head';
import Graph from './components/graph'
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();


const Home: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div >
        <Head>
          <title>Topic Modeling Demo</title>
          <meta name="description" content="A simple topic modeling graph application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Graph />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Home;