import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Element } from 'react-scroll';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useSpring, animated } from 'react-spring';
import { Canvas } from '@react-three/fiber';
import { Sphere, Stars, Html } from '@react-three/drei';
import '../App.css';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';

// Styled components
const ProjectsSection = styled('section')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow:'clip',
  color: '#fff',
  textAlign: 'center',
  background: '#121212',
  padding: '50px 0',
}));

const ProjectsContent = styled('div')(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  maxWidth: '1200px',
  width: '100%',
  padding: '0 20px',
  margin: '0 auto',
}));

const ProjectCard = styled(animated(Card))(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  background: '#1e1e1e',
  color: '#fff',
  cursor: 'pointer',
  perspective: '1000px',
  transition: 'transform 0.6s, box-shadow 0.6s',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '20px',
  '&:hover': {
    transform: 'scale(1.1) rotateY(5deg) rotateX(5deg)',
    boxShadow: '0 20px 30px rgba(0, 188, 200, 0.6)',
  },
}));

const ProjectCardInner = styled('div')(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.8s ease-in-out',
  borderRadius: '20px',
  '&:hover': {
    transform: 'rotateY(360deg)',
  },
}));

const ProjectCardFront = styled('div')(({ theme }) => ({
  width: '100%',
  height: '150px', // Adjust height to fit your content
  backfaceVisibility: 'hidden',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ProjectCardBack = styled(CardContent)(({ theme }) => ({
  width: '90%',
  height: '150px', // Adjust height to fit your content
  backgroundColor: '#1e1e1e',
  color: '#fff',
  transform: 'rotateY(180deg)',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Overlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s',
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
}));

const Tag = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: '#00bcd0',
  color: '#fff',
}));

// Updated project list
const projectsList = [
  {
    title: 'E-COMMERCE PLATFORM',
    description: 'An online shopping platform with features like product listings, cart management, and secure checkout.',
    image: 'https://via.placeholder.com/150',
    details: 'Developed using React for the frontend and Node.js for the backend, this project includes user authentication, payment integration, and a responsive design.',
    link: 'https://example.com/e-commerce',
    tags: ['React', 'Node.js', 'JavaScript', 'CSS'],
  },
  {
    title: 'E-LEARNING PLATFORM',
    description: 'A web application for online courses with features such as course management, quizzes, and progress tracking.',
    image: 'https://via.placeholder.com/150',
    details: 'Built with React and Node.js, this platform supports multimedia content, user progress tracking, and interactive quizzes.',
    link: 'https://example.com/e-learning',
    tags: ['React', 'Node.js', 'JavaScript', 'CSS'],
  },
  {
    title: 'CHAT APPLICATION',
    description: 'A real-time chat application with support for multiple users, channels, and direct messaging.',
    image: 'https://via.placeholder.com/150',
    details: 'Utilizes WebSocket for real-time communication, with a React frontend and a Node.js backend. Includes user authentication and message history.',
    link: 'https://example.com/chat',
    tags: ['React', 'Node.js', 'JavaScript', 'CSS'],
  },
  {
    title: 'SAP POINTS CALCULATOR',
    description: 'A tool for calculating and managing student activity points based on various criteria and achievements.',
    image: 'https://via.placeholder.com/150',
    details: 'Developed using React and a RESTful API for backend services. Features include dynamic point calculations, user management, and activity tracking.',
    link: 'https://example.com/student-activity',
    tags: ['React', 'JavaScript', 'CSS'],
  },
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: '#121212',
};

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
    />
  );
};

const Projects = () => {
  const [flipped, setFlipped] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleFlip = (index) => {
    setFlipped(index === flipped ? null : index);
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(30px)' },
    reset: true,
  });

  return (
    <Element name="projects">
      <ProjectsSection>
        <BackgroundAnimation />
        <Particles />
        <ProjectsContent>
          <animated.div style={springProps}>
            <Typography variant="h2" component="div" gutterBottom>
              My Projects
            </Typography>
            <Grid container spacing={5}>
              {projectsList.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div style={{ height: '100%' }}>
                    <ProjectCard onClick={() => handleFlip(index)}>
                      <ProjectCardInner style={{ transform: flipped === index ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                        <ProjectCardFront>
                          <CardMedia
                            component="img"
                            alt={project.title}
                            image={project.image}
                            title={project.title}
                          />
                          <Overlay>
                            <Typography variant="h5" component="div" gutterBottom>
                              {project.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                              {project.description}
                            </Typography>
                            <IconWrapper>
                              {project.tags.includes('React') && <FaReact size={24} />}
                              {project.tags.includes('Node.js') && <FaNodeJs size={24} />}
                              {project.tags.includes('HTML') && <FaHtml5 size={24} />}
                              {project.tags.includes('CSS') && <FaCss3Alt size={24} />}
                              {project.tags.includes('JavaScript') && <FaJs size={24} />}
                            </IconWrapper>
                          </Overlay>
                        </ProjectCardFront>
                        <ProjectCardBack>
                          <Typography gutterBottom variant="h5" component="div">
                            {project.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {project.description}
                          </Typography>
                          <div style={{ marginTop: '10px' }}>
                            {project.tags.map((tag, i) => (
                              <Tag key={i} label={tag} />
                            ))}
                          </div>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(project)}
                            style={{ marginTop: '20px' }}
                          >
                            View Details
                          </Button>
                        </ProjectCardBack>
                      </ProjectCardInner>
                    </ProjectCard>
                  </div>
                </Grid>
              ))}
            </Grid>
          </animated.div>
        </ProjectsContent>
      </ProjectsSection>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedProject && (
            <>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                {selectedProject.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedProject.details}
              </Typography>
              <div style={{ marginTop: '10px' }}>
                {selectedProject.tags.map((tag, i) => (
                  <Tag key={i} label={tag} />
                ))}
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.open(selectedProject.link, '_blank')}
                style={{ marginTop: '20px' }}
              >
                View Project
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Element>
  );
};

export default Projects;
