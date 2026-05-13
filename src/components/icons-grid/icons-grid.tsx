import { getChildren, type DesktopItem, type GroupItem, type PostItem, type FolderItem, type LinkItem } from '../../posts'
import './icons-grid.css'

interface IconsGridProps {
  items: DesktopItem[]
  onOpen: (item: DesktopItem) => void
}

type NonGroupItem = PostItem | FolderItem | LinkItem

interface DesktopIconProps {
  item: NonGroupItem
  onOpen: (item: DesktopItem) => void
}

function DesktopIcon({ item, onOpen }: Readonly<DesktopIconProps>) {
  return (
    <button
      className="desktop-icon"
      style={{
        gridColumn: item.gridSlot?.x ?? 'auto',
        gridRow: item.gridSlot?.y ?? 'auto',
      }}
      onClick={() => onOpen(item)}
    >
      {item.icon
        ? <img src={item.icon} alt={item.title} className="icon-image" />
        : <span className="icon-emoji">{item.emoji}</span>
      }
      <span>{item.title}</span>
    </button>
  )
}

interface IconsGroupProps {
  group: GroupItem
  onOpen: (item: DesktopItem) => void
}

function IconsGroup({ group, onOpen }: Readonly<IconsGroupProps>) {
  const children = getChildren(group.id)
  return (
    <div
      className="icons-group"
      style={{
        gridColumn: `${group.gridSlot!.x} / span ${group.gridSpan.cols}`,
        gridRow: `${group.gridSlot!.y} / span ${group.gridSpan.rows}`,
      }}
    >
      <span className="icons-group-title">{group.title}</span>
      {children.map(item => (
        <DesktopIcon key={item.id} item={item as NonGroupItem} onOpen={onOpen} />
      ))}
    </div>
  )
}

export function IconsGrid({ items, onOpen }: Readonly<IconsGridProps>) {
  return (
    <div className="icons-grid">
      {items.map(item =>
        item.type === 'group'
          ? <IconsGroup key={item.id} group={item} onOpen={onOpen} />
          : <DesktopIcon key={item.id} item={item as NonGroupItem} onOpen={onOpen} />
      )}
    </div>
  )
}
