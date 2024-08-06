import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Element } from 'react-scroll';
import { LinearProgress, Tooltip, Tabs, Tab } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { Sphere, Stars, Html } from '@react-three/drei';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPython, FaDatabase, FaJava, FaGithub } from 'react-icons/fa';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SkillsSection = styled('section')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  color: '#fff',
  textAlign: 'center',
  background: 'rgba(18, 18, 18, 0.9)', // Transparent background
  padding: '20px 0', // Adjusted padding
}));

const SkillsContent = styled('div')(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  maxWidth: '600px', // Adjusted width
  width: '100%',
  padding: '0 10px', // Adjusted padding
}));

const SkillItem = styled('div')(({ theme }) => ({
  marginBottom: '15px', // Consistent margin
  padding: '12px', // Adjusted padding
  borderRadius: '8px',
  backgroundColor: 'rgba(44, 44, 44, 0.8)', // Semi-transparent background
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 4px 20px rgba(0, 188, 200, 0.7)', // Slightly stronger shadow
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px', // Reduced gap
  marginBottom: '6px', // Reduced margin
}));

const ProgressWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '8px', // Reduced height
  borderRadius: '6px',
  overflow: 'hidden',
  marginTop: '4px', // Reduced margin
}));

const SkillProgress = styled(LinearProgress)(({ value }) => ({
  height: '8px',
  borderRadius: '6px',
  backgroundColor: 'rgba(51, 51, 51, 0.8)', // Transparent background
  '& .MuiLinearProgress-bar': {
    backgroundColor: value < 50 ? '#ff4c4c' : value < 75 ? '#ffb74d' : '#4caf50', // Updated colors
  },
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
          fontSize: '1rem', // Reduced font size
          fontWeight: 'bold',
        }}>
        </div>
      </Html>
    </Canvas>
  );
};

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
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 188, 200, 0.5), rgba(18, 18, 18, 0.5))`,
        transition: 'background 0.3s',
        zIndex: 1,
      }}
    />
  );
};

const TabPanel = styled('div')(({ theme }) => ({
  padding: '10px', // Reduced padding
  borderRadius: '8px', // Adjusted border radius
  backgroundColor: 'rgba(30, 30, 30, 0.8)', // Semi-transparent background
}));

const Skills = () => {
  const [progress, setProgress] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const skillData = [
      { name: 'JavaScript', value: 80, icon: <FaJs size={36} />, category: 'Frontend' },
      { name: 'React', value: 70, icon: <FaReact size={36} />, category: 'Frontend' },
      { name: 'Node.js', value: 60, icon: <FaNodeJs size={36} />, category: 'Backend' },
      { name: 'CSS', value: 90, icon: <FaCss3Alt size={36} />, category: 'Frontend' },
      { name: 'HTML', value: 95, icon: <FaHtml5 size={36} />, category: 'Frontend' },
      { name: 'Python', value: 75, icon: <FaPython size={36} />, category: 'Backend' },
      { name: 'Java', value: 65, icon: <FaJava size={36} />, category: 'Backend' },
      { name: 'Database', value: 70, icon: <FaDatabase size={36} />, category: 'Database' },
      { name: 'GitHub', value: 85, icon: <FaGithub size={36} />, category: 'Tools' },
    ];

    const timeoutId = setTimeout(() => {
      setProgress(skillData);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredSkills = progress.filter(skill => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return skill.category === 'Frontend';
    if (tabValue === 2) return skill.category === 'Backend';
    if (tabValue === 3) return skill.category === 'Database';
    if (tabValue === 4) return skill.category === 'Tools';
    return true;
  });

  return (
    <Element name="skills">
      <SkillsSection>
        <BackgroundAnimation />
        <Particles />
        <SkillsContent>
          <Typography variant="h3" component="div" gutterBottom> {/* Adjusted font size */}
            My Skills
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Skill Categories"
            centered
          >
            <Tab label="All" />
            <Tab label="Frontend" />
            <Tab label="Backend" />
            <Tab label="Database" />
            <Tab label="Tools" />
          </Tabs>
          <TabPanel>
            {filteredSkills.map((skill, index) => (
              <SkillItem key={index}>
                <Tooltip title={`Proficiency: ${skill.value}%`} arrow>
                  <IconWrapper>
                    {skill.icon}
                    <Typography variant="h6" component="div"> {/* Adjusted font size */}
                      {skill.name}
                    </Typography>
                  </IconWrapper>
                </Tooltip>
                <ProgressWrapper>
                  <SkillProgress variant="determinate" value={skill.value} />
                </ProgressWrapper>
              </SkillItem>
            ))}
          </TabPanel>
        </SkillsContent>
      </SkillsSection>
    </Element>
  );
};

export default Skills;
