import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 left-0 right-0 z-40 h-[3px] pointer-events-none bg-slate-200/35 dark:bg-white/5"
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-500 dark:via-amber-400 dark:to-amber-300"
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
      />
    </div>
  );
}
