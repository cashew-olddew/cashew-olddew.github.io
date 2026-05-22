import React from 'react'

export function Color({ children, hex, color }: { children: React.ReactNode, hex?: string, color?: string }) {
  return <span style={{ color: hex || color || 'inherit', fontWeight: 'bold' }}>{children}</span>
}