import React from 'react';
import { Container, Row } from 'reactstrap';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import '../css/Boom.css'; // Ensure this file contains necessary styles

export default function Boom() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  const [props, set] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(30px)',
    from: { opacity: 0, transform: 'translateY(30px)' },
    config: { duration: 1000 },
  }));

  React.useEffect(() => {
    if (inView) {
      set({ opacity: 1, transform: 'translateY(0px)' });
    }
  }, [inView, set]);

  return (
    <div className="section section-basic" id="basic-elements">
      <Container className="d-flex flex-column justify-content-center align-items-center text-center">
        <Row>
          <animated.div
            ref={ref}
            style={{
              ...props,
              position: 'relative',
              width: '100%',
              textAlign: 'center',
              padding: '50px 20px',
              backgroundColor: '#f0f8ff', // Light blue background
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1 className="boom-title">
              Welcome to Youth4Good
            </h1>
            <p className="boom-description">
              Empowering the Future - Join the Movement
            </p>
          </animated.div>
        </Row>
      </Container>
    </div>
  );
}
