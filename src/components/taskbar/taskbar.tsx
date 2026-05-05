import './taskbar.css'

export interface TaskbarWindow {
  id: string
  title: string
  minimized?: boolean
}

interface TaskbarProps {
  windows: TaskbarWindow[]
  onItemClick: (id: string) => void
}

export function Taskbar({ windows, onItemClick }: Readonly<TaskbarProps>) {
  return (
    <div className="taskbar">
      <div className="taskbar-orb" />
      <div className="taskbar-items">
        {windows.map(w => (
          <button
            key={w.id}
            className={`taskbar-item${w.minimized ? ' taskbar-item--minimized' : ''}`}
            onClick={() => onItemClick(w.id)}
            title={w.title}
          >
            <span className="taskbar-item-title">{w.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
