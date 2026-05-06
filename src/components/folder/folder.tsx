import { getChildren, type DesktopItem } from '../../posts'
import { IconsGrid } from '../icons-grid/icons-grid'

interface FolderProps {
  folderId: string
  onOpen: (item: DesktopItem) => void
}

export function Folder({ folderId, onOpen }: Readonly<FolderProps>) {
  const children = getChildren(folderId)
  return <IconsGrid items={children} onOpen={onOpen} />
}
