import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Element, scroller } from 'react-scroll'; // Import scroller for programmatic scrolling
import { Canvas } from '@react-three/fiber';
import { Sphere, Stars, Html } from '@react-three/drei';

const HeroSection = styled('section')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: '#fff',
  textAlign: 'center',
  background: '#121212', // Dark theme background
}));

const HeroContent = styled('div')(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  maxWidth: '800px',
}));

const Particles = () => {
  return (
    <Canvas
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars
        radius={100}
        depth={70}
        count={10000}
        factor={5}
        saturation={0}
        fade
      />
      <Sphere args={[1, 32, 32]} scale={[2, 2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00bcd0" // Cyan color for 3D particles
          emissive="#00acc1"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
      <Html
        position={[0, 0, 2]}
        center
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
        }}>
        </div>
      </Html>
    </Canvas>
  );
};

const BackgroundEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 100,
      y: (event.clientY / window.innerHeight) * 100,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 188, 200, 0.7), rgba(18, 18, 18, 0.5))`,
        transition: 'background 0.3s',
        zIndex: 1,
      }}
    />
  );
};

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: '#00acc1' },
    tap: { scale: 0.95 },
  };

  // Function to handle button click and scroll to "contact" section
  const scrollToContact = () => {
    scroller.scrollTo('contact', {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Element name="hero">
      <HeroSection>
        <BackgroundEffect />
        <Particles />
        <HeroContent>
          <motion.div
            variants={textVariants}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" component="div" gutterBottom>
              Hello, I'm Kapeesh
            </Typography>
            <Typography variant="h5" component="div">
              An IT Enthusiast & Full-Stack Developer
            </Typography>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              style={{ marginTop: '20px' }}
            >
              <Typography variant="body1" component="div" paragraph>
                I specialize in creating high-performance web applications and have a keen interest in emerging technologies.
              </Typography>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={scrollToContact} // Add onClick handler here
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '25px',
                  backgroundColor: '#00bcd4',
                  color: '#fff',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, transform 0.3s',
                }}
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </HeroContent>
      </HeroSection>
    </Element>
  );
};

export default Hero;
