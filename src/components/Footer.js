import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';

// Styled components
const FooterSection = styled('footer')(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #2a2a2a, #1e1e1e)', // Gradient background
  color: theme.palette.text.primary,
  textAlign: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  bottom: 0,
  width: '100%',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)', // Subtle shadow for depth
  transition: 'background 0.3s ease', // Smooth background transition
  '&:hover': {
    background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)', // Hover effect
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: theme.spacing(1),
  transition: 'color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    color: theme.palette.secondary.main,
    transform: 'scale(1.2)', // Scale effect on hover
  },
}));

const NameLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

const Footer = () => {
  return (
    <FooterSection>
      <Typography variant="body2" gutterBottom>
        &copy; {new Date().getFullYear()} <NameLink href="https://www.linkedin.com/in/kapeesh-s-658455256/" target="_blank" aria-label="LinkedIn">Kapeesh</NameLink>. All rights reserved.
      </Typography>
      <div>
        <SocialIcon
          component="a"
          href="https://www.linkedin.com/in/kapeesh-s-658455256/" 
          target="_blank"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </SocialIcon>
        <SocialIcon
          component="a"
          href="https://github.com/kapeesh-selvathangaraj" 
          target="_blank"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </SocialIcon>
      </div>
    </FooterSection>
  );
};

export default Footer;
