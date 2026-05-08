import './prose-components.css'

interface AlignProps {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
  textAlign?: 'left' | 'center' | 'right'
}

export function Separator() {
  return <hr className="prose-separator" />
}

export function Align({ children, align = 'left', textAlign }: Readonly<AlignProps>) {
  return (
    <div
      className="prose-align"
      style={{
        alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
        textAlign: textAlign ?? align,
      }}
    >
      {children}
    </div>
  )
}
