import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import CursorBlinker from '../cursor-blinker';

export default function TextAnim({ text }: { text: string }) {
  const baseText = text;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.slice(0, latest));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: 'tween',
      duration: 5,
      ease: 'easeInOut'
    });
    return controls.stop;
  }, []);

  return (
    <span className="">
      <motion.span>{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
}
