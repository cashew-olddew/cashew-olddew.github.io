import './media.css'

interface MediaProps {
  label?: string
  labelPosition?: 'above' | 'below'
  width?: number | string
  children: React.ReactNode
}

interface MediaGroupProps {
  children: React.ReactNode
}

export function Media({ label, labelPosition = 'below', width, children }: Readonly<MediaProps>) {
  return (
    <figure className="media">
      {label && labelPosition === 'above' && (
        <figcaption className="media-label">{label}</figcaption>
      )}
      <div className="media-content" style={{ width: width ?? 'auto' }}>
        {children}
      </div>
      {label && labelPosition === 'below' && (
        <figcaption className="media-label">{label}</figcaption>
      )}
    </figure>
  )
}

export function MediaGroup({ children }: Readonly<MediaGroupProps>) {
  return (
    <div className="media-group">
      {children}
    </div>
  )
}
