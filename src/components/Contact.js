import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';
import { Element } from 'react-scroll';
import { TextField, Button, Container, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { Canvas } from '@react-three/fiber';
import { Sphere, Stars, Html } from '@react-three/drei';
import '../App.css';

// Keyframes for text animation
const textAnimation = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  50% { transform: translateY(0); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 1; }
`;

// Keyframes for input shaking animation
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

// Keyframes for slide-in animation
const slideIn = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

// Keyframes for slide-out animation
const slideOut = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
`;

// Styled components
const ContactSection = styled('section')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  color: '#fff',
  textAlign: 'center',
  background: '#1e1e1e',
  padding: '80px 0', // Increased padding for better spacing
}));

const ContactContent = styled('div')(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  maxWidth: '600px', // Adjusted max-width for better alignment
  width: '100%',
  padding: '0 20px',
}));

const ErrorTextField = styled(TextField)(({ error }) => ({
  '& input': {
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Darker background for contrast
    borderRadius: '4px',
    padding: '10px',
    fontSize: '1rem',
    color: '#fff', // Ensuring text color contrasts well
    animation: error ? `${shake} 0.5s ease` : 'none',
  },
  '& fieldset': {
    borderColor: error ? '#f44336' : 'rgba(255, 255, 255, 0.3)', // Border color with error handling
  },
  '& input:focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly lighter background on focus
    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
    borderColor: '#00bcd0', // Highlight border color on focus
  },
  '& input::placeholder': {
    color: 'rgba(255, 255, 255, 0.7)', // Placeholder text color for better visibility
  },
}));

const MessageBox = styled(Box)(({ type }) => ({
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '20px 40px',
  borderRadius: '8px',
  boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
  width: 'auto',
  maxWidth: '90%',
  textAlign: 'center',
  zIndex: 2000,
  backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
  color: '#fff',
  animation: `${slideIn} 0.5s ease-out`,
  opacity: 1,
  transition: 'opacity 0.5s ease',
}));

const SuccessMessage = ({ open }) => (
  <MessageBox type="success" sx={{ opacity: open ? 1 : 0, display: open ? 'block' : 'none' }}>
    <Typography variant="h6">Success!</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>
      Your message has been sent successfully. We will get back to you soon.
    </Typography>
  </MessageBox>
);

const FailureMessage = ({ open }) => (
  <MessageBox type="failure" sx={{ opacity: open ? 1 : 0, display: open ? 'block' : 'none' }}>
    <Typography variant="h6">Failed!</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>
      There was an error sending your message. Please try again later.
    </Typography>
  </MessageBox>
);

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const form = useRef();

  const onSubmit = async (data) => {
    try {
      await emailjs.sendForm('service_9t4jxvn', 'template_dnxks5p', form.current, 'dTb_I_pp5uh5pb6Xs');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
      reset();
    } catch (error) {
      setFailure(true);
      setTimeout(() => setFailure(false), 3000); // Hide failure message after 3 seconds
      console.error('Error sending email', error);
    }
  };

  return (
    <>
      <form ref={form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <ErrorTextField
          label="Name"
          fullWidth
          margin="normal"
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
        <ErrorTextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Enter a valid email'
            }
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <ErrorTextField
          label="Message"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register('message', { required: 'Message is required' })}
          error={!!errors.message}
          helperText={errors.message ? errors.message.message : ''}
        />
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              transition: 'all 0.3s ease',
              background: 'linear-gradient(45deg, #00bcd0 30%, #009688 90%)',
              color: '#fff',
              fontSize: '1rem',
              '&:hover': {
                background: 'linear-gradient(45deg, #009688 30%, #00bcd0 90%)',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              },
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '300%',
                height: '300%',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                transition: 'transform 0.5s',
                pointerEvents: 'none',
                zIndex: 1,
              },
              '&:active::after': {
                transform: 'translate(-50%, -50%) scale(1)',
              },
            }}
          >
            Send
          </Button>
        </Box>
      </form>
      <SuccessMessage open={success} />
      <FailureMessage open={failure} />
    </>
  );
};

const Particles = () => {
  return (
    <Canvas
      style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}
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
          fontSize: '1rem',
          fontWeight: 'bold',
        }}>
        </div>
      </Html>
    </Canvas>
  );
};

const BackgroundAnimation = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 100,
      y: (event.clientY / window.innerHeight) * 100,
    });
  };

  React.useEffect(() => {
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
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 188, 200, 0.8), rgba(18, 18, 18, 0.6))`,
        transition: 'background 0.3s',
        zIndex: 1,
      }}
    />
  );
};

const Contact = () => {
  return (
    <Element name="contact">
      <ContactSection>
        <BackgroundAnimation />
        <Particles />
        <ContactContent>
          <Typography variant="h2" component="div" gutterBottom sx={{ animation: `${textAnimation} 1s ease-out`, fontSize: '2.5rem' }}>
            Contact Me
          </Typography>
          <Container maxWidth="sm">
            <ContactForm />
          </Container>
        </ContactContent>
      </ContactSection>
    </Element>
  );
};

export default Contact;
