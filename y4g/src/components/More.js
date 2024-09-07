import React from 'react';
import { Container, Row } from 'reactstrap';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import '../css/More.css'; // Ensure this file contains the necessary styles

const More = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0px)' : 'translateX(50px)', // Slide in from the right
    config: { duration: 1000 },
  });

  return (
    <div className="section section-more" id="more">
      <Container className="d-flex justify-content-end text-right">
        <Row>
          <animated.div
            ref={ref}
            style={{
              ...animationProps,
              padding: '50px 20px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
            }}
          >
            <h2 className="more-title">More Information</h2>
            <p className="more-description">
              Find out more about our programs, events, and ways to get involved. This section can include links to detailed resources or other relevant information.
            </p>
          </animated.div>
        </Row>
      </Container>
    </div>
  );
};

export default More;
