import React, { useEffect, useRef, useState } from 'react';
// import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
// import CursorBlinker from '../cursor-blinker';
import Typed from 'typed.js';

const AnimatedText = ({ html: htmlString }: { html: string }) => {
  const typedRef = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [htmlString],
      typeSpeed: 500 // Adjust the typing speed as needed
    };

    // Initialize Typed.js
    typedRef.current = new Typed('#typist', options);

    // Clean up on unmount
    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, [htmlString]);

  return <div id="typist" />;
};

export default AnimatedText;
