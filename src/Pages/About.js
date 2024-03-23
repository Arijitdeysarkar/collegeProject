import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../Style/AboutPage.css';
import { useEffect } from 'react';
// import { animated, useSpring } from '@react-spring/web'
const AboutPage = () => {
  const aboutPageStyle = {
    padding: '20px',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '18px',
    lineHeight: '1.5',
    fontWeight: '500',
    color:'#fff'
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    margin: '20px 0',
  };
  const coordinators = [
    { name: 'Abhijit Adak', role: 'Project Coordinator', email: 'john@example.com', image: require('../Style/Images/Scan.jpg')},
    { name: 'Arijit Dey Sarkar', role: 'Assistant Coordinator', email: 'jane@example.com', image: require('../Style/Images/arijit.JPG') },
    { name: 'Sudipta Haldar', role: 'Assistant Coordinator', email: 'john@example.com', image: require('../Style/Images/sudipta.jpeg')},
    { name: 'Avik Ghosh', role: 'Assistant Coordinator', email: 'john@example.com', image: require('../Style/Images/image.jpg') },

    // Add more coordinators as needed
  ];
  useEffect(()=>{
    window.scrollTo(0,0)
    },[])
  return (
    <div id="trail" style={aboutPageStyle}>
      <h1 style={headingStyle}>About Our College</h1>
      <CSSTransition in={true} appear={true} timeout={1000} classNames="fade" unmountOnExit>
        <img     
         src="https://upload.wikimedia.org/wikipedia/commons/5/57/Techno_india_logo.jpg" alt="College Building" style={imageStyle} />
      </CSSTransition>
      <p style={paragraphStyle}>
        Welcome to our prestigious college. We have a rich history of academic excellence and a strong commitment to shaping the future of our students. Established in 19XX, our college has been a beacon of knowledge and innovation for over a century.
      </p>
      <h2 style={headingStyle}>Our Mission</h2>
      <p style={paragraphStyle}>
        Our mission is to provide a nurturing and inclusive learning environment that empowers students to excel academically, develop leadership skills, and become responsible global citizens.
      </p>
      <h2 style={headingStyle}>Our Vision</h2>
      <p style={paragraphStyle}>
        Our vision is to be a world-class educational institution known for its cutting-edge research, innovative teaching methods, and its contribution to the betterment of society.
      </p>
      <h2 style={headingStyle}>Core Values</h2>
      <ul>
        <li style={paragraphStyle}>Academic Excellence</li>
        <li style={paragraphStyle}>Diversity and Inclusion</li>
        <li style={paragraphStyle}>Integrity and Ethics</li>
        <li style={paragraphStyle}>Innovation and Research</li>
        <li style={paragraphStyle}>Community Engagement</li>
      </ul>
      <h2 style={headingStyle}>Academic Programs</h2>
      <p style={paragraphStyle}>
        Our college offers a wide range of academic programs, including:
      </p>
      <ul>
        <li style={paragraphStyle}>Engineering</li>
        <li style={paragraphStyle}>Business Administration</li>
        <li style={paragraphStyle}>Arts and Humanities</li>
        <li style={paragraphStyle}>Science and Technology</li>
        {/* Add more programs as needed */}
      </ul>
      <h2 style={headingStyle}>Campus Facilities</h2>
      <p style={paragraphStyle}>
        Our state-of-the-art campus includes modern facilities such as:
      </p>
      <ul>
        <li style={paragraphStyle}>Library and Research Center</li>
        <li style={paragraphStyle}>Sports Complex</li>
        <li style={paragraphStyle}>Computer Labs</li>
        <li style={paragraphStyle}>Student Housing</li>
        {/* Add more facilities as needed */}
      </ul>
      <div style={styles.container}>
      <h2 style={{color:'#000',fontWeight:'bold'}}>Project Coordinators</h2>
      <div style={styles.coordinatorsContainer}>
        {coordinators.map((coordinator, index) => (
          <div key={index} style={styles.coordinatorCard}>
            <div style={styles.leftCard}>
              <img src={coordinator.image} alt={coordinator.name} style={styles.image} />
            </div>
            <div style={styles.rightCard}>
              <h3 style={{color:'#000'}}>{coordinator.name}</h3>
              <p style={{color:'#fff',fontWeight:'500'}}>{coordinator.role}</p>
              <p style={{color:'#fff',fontWeight:'500'}}>Email: {coordinator.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AboutPage;
const styles = {
  container: {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
  },
  coordinatorsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  coordinatorCard: {
    display: 'grid',
    gridTemplateColumns: '1.fr 2.5fr',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  leftCard: {
    backgroundColor: 'transparent',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#45a049', // Darken the background color on hover
    },
  },
  rightCard: {
    padding: '20px',
    textAlign: 'left',
  },
  image: {
    width: '200px',
    borderRadius: '5%',
    height:'150px',
    // marginBottom: '10px',
    transition: 'transform 0.5s ease-in-out',
    '&:hover': {
      transform: 'rotate(360deg)', // Rotate the image on hover
    },
  },
};
