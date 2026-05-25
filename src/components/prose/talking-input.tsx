import { useState } from 'react'
import './talking-input.css'

export function TalkingInput() {
  const [value, setValue] = useState('')
  const isKind = value.includes(':)')

  return (
    <div className="talking-input">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ width: 200 }}
      />
      {isKind && (
        <p className="talking-input-message">
          <strong>*Blushes in HTML*</strong><br />
          A smiley face, for me?! Thank you!<br />
          I'll save this in my temporary local cache forever!
        </p>
      )}
    </div>
  )
}
