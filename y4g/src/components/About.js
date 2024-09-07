import React from 'react';
import { Container, Row } from 'reactstrap';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import '../css/About.css'; // Ensure this file contains the necessary styles

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000 },
  });

  return (
    <div className="section section-about" id="about">
      <Container className="d-flex flex-column justify-content-center align-items-center text-center">
        <Row>
          <animated.div
            ref={ref}
            style={{
              ...animationProps,
              padding: '50px 20px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              maxWidth: '800px',
            }}
          >
            <h2 className="about-title">About Us</h2>
            <p className="about-description">
              Learn more about Youth4Good and our mission to make a positive impact.
              This section provides information about our values, goals, and achievements.
            </p>
          </animated.div>
        </Row>
      </Container>
    </div>
  );
};

export default About;