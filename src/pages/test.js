
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <center>
        <h1 style={{ marginTop: '250px' }}>Page de test</h1>
        <br />
        <p className='gold-gradient-effect' style={{ fontWeight: 'bold' }}>Ceci est une page écrite en React.</p>
        <i><p className='mp3-gradient-effect' style={{ fontWeight: 'bold' }}>Et je déteste le React.</p></i>
      </center>
    </Layout>
  );
}