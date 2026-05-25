import './media.css'

interface MediaProps {
  label?: string
  labelPosition?: 'above' | 'below'
  width?: number | string
  /** When true, removes the decorative border and background from the content area. */
  plain?: boolean
  children: React.ReactNode
}

interface MediaGroupProps {
  align: "center"
  children: React.ReactNode
}

export function Media({ label, labelPosition = 'below', width, plain = false, children }: Readonly<MediaProps>) {
  return (
    <figure className="media">
      {label && labelPosition === 'above' && (
        <figcaption className="media-label">{label}</figcaption>
      )}
      <div className={`media-content${plain ? ' media-content--plain' : ''}`} style={{ width: width ?? 'auto' }}>
        {children}
      </div>
      {label && labelPosition === 'below' && (
        <figcaption className="media-label">{label}</figcaption>
      )}
    </figure>
  )
}

export function MediaGroup({ align, children }: Readonly<MediaGroupProps>) {
  return (
    <div className={`media-group${align ? ' media-center' : ''}`}>
      {children}
    </div>
  )
}
