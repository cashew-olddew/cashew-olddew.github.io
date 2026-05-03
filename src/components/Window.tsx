import { motion, type Variants, useDragControls } from 'framer-motion'
import { type RefObject } from 'react'

interface WindowProps {
  id: string
  title: string
  children: React.ReactNode
  onClose: (id: string) => void
  onFocus: (id: string) => void
  zIndex: number
  defaultPosition: { x: number; y: number }
  constraintsRef: RefObject<HTMLDivElement | null>
}

const variants = {
  initial: { scale: 0.75, opacity: 0 },
  animate: {
    scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
  exit: {
    scale: 0.75, opacity: 0,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
} satisfies Variants

export function Window({ id, title, children, onClose, onFocus, zIndex, defaultPosition, constraintsRef }: WindowProps) {
  const dragControls = useDragControls()

  return (
    <motion.div
      className="window"
      style={{ zIndex, width: 560, x: defaultPosition.x, y: defaultPosition.y }}
      drag
      dragMomentum={false}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      onMouseDown={() => onFocus(id)}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div
        className="window-titlebar"
        onPointerDown={e => dragControls.start(e)}
      >
        <span>{title}</span>
        <button className="window-close" onClick={() => onClose(id)}>✕</button>
      </div>
      <div className="window-body">{children}</div>
    </motion.div>
  )
}