import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import CursorBlinker from '../cursor-blinker';

const AnimatedText = ({ text }: { text: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: 'tween',
      duration: 5,
      ease: 'easeInOut'
    });

    return () => {
      controls.stop();
    };
  }, [text.length]);

  return <motion.span>{displayText}</motion.span>;
};

const TextAnim = ({ html }: { html: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentArray: string[] = [];

  const splitHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return Array.from(div.children).map((child) => child.outerHTML);
  };

  const renderContent = (html: string) => {
    const elements = splitHtml(html);

    elements.forEach((tag) => {
      if (tag.includes('<p')) {
        const innerHTML = tag.replace(/<\/?p[^>]*>/g, ''); // Remove <p> tags
        contentArray.push(`<p>${innerHTML}</p>`);
      } else {
        contentArray.push(tag);
      }
    });
  };

  useEffect(() => {
    renderContent(html);
  }, [html]);

  return (
    <div ref={containerRef}>
      {contentArray.map((content, index) => (
        <React.Fragment key={index}>
          {content.includes('<p') ? (
            <AnimatedText text={content} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </React.Fragment>
      ))}
      <CursorBlinker />
    </div>
  );
};

export default TextAnim;
