import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer/>
    </ThemeProvider>
  );
}

export default App;
