import { useRef, useState } from 'react'

export default function MusicToggle() {
  const [on, setOn] = useState(false)
  const context = useRef(null)
  const toggle = () => {
    if (!on) {
      context.current ??= new AudioContext()
      const oscillator = context.current.createOscillator()
      const gain = context.current.createGain()
      oscillator.frequency.value = 261.63
      gain.gain.setValueAtTime(0.0001, context.current.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.025, context.current.currentTime + .05)
      gain.gain.exponentialRampToValueAtTime(0.0001, context.current.currentTime + .65)
      oscillator.connect(gain).connect(context.current.destination); oscillator.start(); oscillator.stop(context.current.currentTime + .7)
    }
    setOn(value => !value)
  }
  return <button className={`music-control ${on ? 'is-on' : ''}`} onClick={toggle} aria-label={on ? 'Turn music off' : 'Turn music on'}><span>{on ? '♫' : '♩'}</span><small>{on ? 'ON' : 'OFF'}</small></button>
}
