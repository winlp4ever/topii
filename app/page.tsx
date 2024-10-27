import React from 'react';
import Head from 'next/head';
import Graph from './components/graph'

const Home: React.FC = () => {
  return (
    <div >
      <Head>
        <title>Next.js with React Flow</title>
        <meta name="description" content="A simple graph using React Flow in a Next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Next.js with React Flow</h1>
        <Graph />
      </main>
    </div>
  );
};

export default Home;