import { motion, type Variants, useDragControls } from "framer-motion";
import { type RefObject } from "react";
import "./window.css";
import "../../styles/prose.css";

import Cross from "../../assets/ui/cross.svg?react";
import Maximize from '../../assets/ui/maximize.svg?react'

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;

  onMaximize: () => void;
  onClose: () => void;
  onFocus: () => void;

  maximized?: boolean

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
  exit: {
    scale: 0.75,
    opacity: 0,
    transition: { duration: 0.12, ease: "easeIn" },
  },
} satisfies Variants;


export function Window({
  id,
  title,
  children,
  onMaximize,
  onClose,
  onFocus,
  maximized,
  windowPosition,
}: Readonly<WindowProps>) {
  const dragControls = useDragControls();

  return (
    <motion.div
      className="window"
      style={{
        zIndex: windowPosition.zIndex,

        x: windowPosition.defaultPosition.x,
        y: windowPosition.defaultPosition.y,

        position: maximized ? 'absolute' : 'relative',
                top: maximized ? 0 : windowPosition.defaultPosition.y,
        left: maximized ? 0 : windowPosition.defaultPosition.x,
        width: maximized ? '100vw' : 560,
        height: maximized ? '100vh' : 'auto'
      }}
      drag={!maximized}
      dragMomentum={false}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={windowPosition.constraintsRef}
      dragElastic={0}
      onMouseDown={() => onFocus()}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div
        className="window-titlebar"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <span>{title}</span>
        <div className="window-titlebar-controls">
          <button onClick={onMaximize}>
            <Maximize />
          </button>
          <button className="window-close" onClick={onClose}>
            <Cross />
          </button>
        </div>
      </div>
      <div className="window-body prose">{children}</div>
    </motion.div>
  );
}

export { type WindowPosition };
