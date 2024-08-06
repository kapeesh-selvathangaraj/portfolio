import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-scroll';
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import logo from '../assets/logo.png'; // Assuming you have a logo image
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Header.css'; // Import custom CSS for cursor animation
import { motion } from 'framer-motion';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: 'background-color 0.5s ease, opacity 0.5s ease',
  backgroundColor: 'transparent',
  opacity: 1,
  '&.scrolled': {
    backgroundColor: '#11ffee00',
    opacity: 0.9,
  },
}));

const StyledButton = styled(Link)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  padding: '0.5rem 1rem',
  color: theme.palette.primary.main,
  margin: theme.spacing(1),
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'color 0.3s ease-in-out',
  '&::after': {
    content: "''",
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: theme.palette.secondary.main,
    transform: 'scaleX(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
  '&.active': {
    color: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  '&:hover': {
    color: theme.palette.secondary.main,
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '& .MuiMenu-paper': {
    transform: 'scale(0.95)',
    transition: 'transform 0.3s ease-in-out',
  },
  '&.MuiMenu-paper': {
    transform: 'scale(1)',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(5px)',
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: theme.spacing(0.5),
  '&:hover': {
    color: theme.palette.secondary.main,
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSetActive = (section) => {
    setActiveSection(section);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
  };

  const handleMouseMove = (event) => {
    if (cursorRef.current) {
      cursorRef.current.style.top = `${event.clientY}px`;
      cursorRef.current.style.left = `${event.clientX}px`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const trigger = useScrollTrigger();

  return (
    <>
      <StyledAppBar position="fixed" className={scrolled ? 'scrolled' : ''} elevation={0}>
        <Toolbar>
          <img src={logo} alt="logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <StyledMenuItem onClick={handleMenuClose}>
                <StyledButton
                  to="about"
                  smooth
                  duration={500}
                  onSetActive={() => handleSetActive('about')}
                  className={activeSection === 'about' ? 'active' : ''}
                >
                  About
                </StyledButton>
              </StyledMenuItem>
              <StyledMenuItem onClick={handleMenuClose}>
                <StyledButton
                  to="projects"
                  smooth
                  duration={500}
                  onSetActive={() => handleSetActive('projects')}
                  className={activeSection === 'projects' ? 'active' : ''}
                >
                  Projects
                </StyledButton>
              </StyledMenuItem>
              <StyledMenuItem onClick={handleMenuClose}>
                <StyledButton
                  to="skills"
                  smooth
                  duration={500}
                  onSetActive={() => handleSetActive('skills')}
                  className={activeSection === 'skills' ? 'active' : ''}
                >
                  Skills
                </StyledButton>
              </StyledMenuItem>
              <StyledMenuItem onClick={handleMenuClose}>
                <StyledButton
                  to="contact"
                  smooth
                  duration={500}
                  onSetActive={() => handleSetActive('contact')}
                  className={activeSection === 'contact' ? 'active' : ''}
                >
                  Contact
                </StyledButton>
              </StyledMenuItem>
            </StyledMenu>
          </div>
          <div sx={{ display: { xs: 'none', sm: 'block' } }}>
            <StyledButton
              to="about"
              smooth
              duration={500}
              onSetActive={() => handleSetActive('about')}
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </StyledButton>
            <StyledButton
              to="projects"
              smooth
              duration={500}
              onSetActive={() => handleSetActive('projects')}
              className={activeSection === 'projects' ? 'active' : ''}
            >
              Projects
            </StyledButton>
            <StyledButton
              to="skills"
              smooth
              duration={500}
              onSetActive={() => handleSetActive('skills')}
              className={activeSection === 'skills' ? 'active' : ''}
            >
              Skills
            </StyledButton>
            <StyledButton
              to="contact"
              smooth
              duration={500}
              onSetActive={() => handleSetActive('contact')}
              className={activeSection === 'contact' ? 'active' : ''}
            >
              Contact
            </StyledButton>
          </div>
          <div>
            <SocialIcon
              href="https://www.linkedin.com/in/kapeesh-s-658455256/" // Replace with your LinkedIn URL
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </SocialIcon>
            <SocialIcon
              href="https://github.com/kapeesh-selvathangaraj" // Replace with your GitHub URL
              target="_blank"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </SocialIcon>
          </div>
        </Toolbar>
      </StyledAppBar>
      <div className="custom-cursor" ref={cursorRef}></div>
    </>
  );
};

export default Header;
