import type { DesktopItem } from '../../posts'
import './icons-grid.css'

interface IconsGridProps {
  items: DesktopItem[]
  onOpen: (item: DesktopItem) => void
}

export function IconsGrid({ items, onOpen }: Readonly<IconsGridProps>) {
  return (
    <div className="icons-grid">
      {items.map(item => (
        <div
          key={item.id}
          className="desktop-icon"
          style={{
            gridColumn: item.gridSlot?.x ?? 'auto',
            gridRow: item.gridSlot?.y ?? 'auto',
          }}
          onClick={() => onOpen(item)}
        >
          <span className="icon-emoji">{item.emoji}</span>
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  )
}
