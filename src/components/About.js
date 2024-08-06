import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, Stars, Html } from '@react-three/drei';

const AboutSection = styled('section')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  color: '#fff',
  textAlign: 'center',
  background: '#121212', // Dark theme background to match Hero
  padding: '50px 0',
  overflow: 'hidden',
}));

const AboutContent = styled('div')(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  maxWidth: '800px',
  width: '100%',
  padding: '0 20px',
}));

const BackgroundAnimation = () => {
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
    >
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
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <Sphere args={[1, 32, 32]} scale={[2, 2, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00bcd0"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', damping: 10 }}
            >
            </motion.div>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

const About = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Element name="about">
      <AboutSection>
        <BackgroundAnimation />
        <AboutContent>
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" component="div" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" component="p">
              I am a passionate IT fresher ready to make an impact in the industry. With a strong foundation in software development and a keen interest in new technologies, I am eager to contribute to exciting projects and grow my skills.
            </Typography>
          </motion.div>
        </AboutContent>
      </AboutSection>
    </Element>
  );
};

export default About;
