import { describe, it, expect } from 'vitest'
import { hexToRgb } from './shader-webgl'

// Note: compileShader and buildProgram require a real WebGL context and are not
// tested here — they are exercised indirectly by the canvas component at runtime.

describe('hexToRgb', () => {
  it('converts pure black', () => {
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
  })

  it('converts pure white', () => {
    expect(hexToRgb('#ffffff')).toEqual([1, 1, 1])
  })

  it('converts pure red', () => {
    expect(hexToRgb('#ff0000')).toEqual([1, 0, 0])
  })

  it('converts pure green', () => {
    expect(hexToRgb('#00ff00')).toEqual([0, 1, 0])
  })

  it('converts pure blue', () => {
    expect(hexToRgb('#0000ff')).toEqual([0, 0, 1])
  })

  it('converts a mixed colour', () => {
    // #804020 → r=0x80=128, g=0x40=64, b=0x20=32
    const [r, g, b] = hexToRgb('#804020')
    expect(r).toBeCloseTo(128 / 255)
    expect(g).toBeCloseTo(64 / 255)
    expect(b).toBeCloseTo(32 / 255)
  })

  it('produces values strictly in [0, 1]', () => {
    for (const hex of ['#000000', '#ffffff', '#ff8040', '#123456', '#abcdef']) {
      const [r, g, b] = hexToRgb(hex)
      expect(r).toBeGreaterThanOrEqual(0)
      expect(r).toBeLessThanOrEqual(1)
      expect(g).toBeGreaterThanOrEqual(0)
      expect(g).toBeLessThanOrEqual(1)
      expect(b).toBeGreaterThanOrEqual(0)
      expect(b).toBeLessThanOrEqual(1)
    }
  })

  it('returns a tuple of exactly three numbers', () => {
    const result = hexToRgb('#ff8040')
    expect(result).toHaveLength(3)
    result.forEach(v => expect(typeof v).toBe('number'))
  })
})
