import { motion, type Variants, useDragControls, useMotionValue } from "framer-motion";
import { type RefObject, useRef, useEffect } from "react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { formatDate } from "../../utils/dateUtils";
import "./window.css";
import "../../styles/prose.css";
import "../../styles/shared-components.css";

import Cross from "../../assets/ui/cross.svg?react";
import Maximize from '../../assets/ui/maximize.svg?react'
import ChevronsDown from '../../assets/ui/chevrons-down.svg?react'
import border from '../../assets/ui/border.svg'

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;

  onMaximize: () => void;
  onMinimize: () => void;
  onClose: () => void;
  onFocus: () => void;

  maximized?: boolean
  minimized?: boolean
  variant?: 'folder' | 'post'
  date?: string
  scrollKey?: string
  windowPosition: WindowPosition;
}

interface WindowPosition {
  zIndex: number;
  defaultPosition: { x: number; y: number };
  constraintsRef: RefObject<HTMLDivElement | null>;
}

const variants = {
  initial: { scale: 0.75, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 380, damping: 22 },
  },
  minimized: {
    scale: 0,
    opacity: 0,
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
  exit: {
    scale: 0.75,
    opacity: 0,
    transition: { duration: 0.12, ease: "easeIn" },
  },
} satisfies Variants;

const cssVars = {
  '--border-img': `url(${border})`,
} as React.CSSProperties

export function Window({
  title,
  children,
  onMaximize,
  onMinimize,
  onClose,
  onFocus,
  maximized,
  minimized,
  variant = 'post',
  date,
  scrollKey,
  windowPosition,
}: Readonly<WindowProps>) {
  const { progress: scrollProgress, onScroll } = useScrollProgress()
  const dragControls = useDragControls();
  const x = useMotionValue(windowPosition.defaultPosition.x);
  const y = useMotionValue(windowPosition.defaultPosition.y);
  const savedPosition = useRef<{ x: number; y: number } | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0)
  }, [scrollKey])

  const handleMaximize = () => {
    if (!maximized) {
      savedPosition.current = { x: x.get(), y: y.get() }
      x.set(0);
      y.set(0);
    } else if (savedPosition.current) {
      x.set(savedPosition.current.x);
      y.set(savedPosition.current.y);
    }
    onMaximize();
  };

  const handleMinimize = () => {
    onMinimize();
  };

  return (
    <motion.div
      className={`window window--${variant}${maximized ? ' window--maximized' : ''}${minimized ? ' window--minimized' : ''}`}
      style={{
        ...cssVars,
        zIndex: windowPosition.zIndex,
        x,
        y,
      }}
      drag={!maximized && !minimized}
      dragMomentum={false}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={windowPosition.constraintsRef}
      dragElastic={0}
      onMouseDown={() => onFocus()}
      variants={variants}
      initial="initial"
      animate={minimized ? 'minimized' : 'animate'}
      exit="exit"
    >
      <div
        className="window-titlebar"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <span>{title}</span>
        <div className="window-titlebar-controls">
          <button className="window-minimize" onClick={handleMinimize}>
            <ChevronsDown />
          </button>
          <button onClick={handleMaximize}>
            <Maximize />
          </button>
          <button className="window-close" onClick={onClose}>
            <Cross />
          </button>
        </div>
      </div>
      {variant === 'post' && (
        <div className="reading-progress">
          <div className="reading-progress-bar" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
      )}
      <div
        ref={bodyRef}
        className="window-body content-body"
        onScroll={onScroll}
      >
        {children}
        {date && variant === 'post' && (
          <p className="post-date">{formatDate(date)}</p>
        )}
      </div>
    </motion.div>
  );
}

export { type WindowPosition };
