import { useEffect, useRef, useState } from 'react'
import StoryPage from './StoryPage'
import MusicToggle from './MusicToggle'

export default function StoryBook({ story, onHome }) {
  const [spread, setSpread] = useState(0), [turning, setTurning] = useState(false), [menu, setMenu] = useState(false), [direction, setDirection] = useState('next')
  const [theme, setTheme] = useState('light')
  const startX = useRef(null)
  const audioCtxRef = useRef(null)
  const last = story.spreads.length - 1

  const ensureAudio = () => {
    if (audioCtxRef.current) return audioCtxRef.current
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return null
    const ctx = new AudioContext()
    audioCtxRef.current = ctx
    return ctx
  }

  const playFlipSound = (direction = 'next') => {
    const ctx = ensureAudio()
    if (!ctx) return
    if (ctx.state === 'suspended') ctx.resume()

    // short filtered noise burst + a quick pitch sweep for page-flip feel
    const now = ctx.currentTime
    // noise
    const bufferSize = 0.25 * ctx.sampleRate
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < buffer.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / buffer.length)
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.value = 1500
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.0001, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.2, now + 0.01)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)
    // oscillator sweep
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    const oscGain = ctx.createGain()
    oscGain.gain.setValueAtTime(0.0001, now)
    oscGain.gain.exponentialRampToValueAtTime(0.12, now + 0.01)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
    const startFreq = direction === 'next' ? 900 : 700
    const endFreq = direction === 'next' ? 1200 : 600
    osc.frequency.setValueAtTime(startFreq, now)
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.18)

    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)

    noise.start(now)
    noise.stop(now + 0.25)
    osc.start(now)
    osc.stop(now + 0.2)
  }

  const go = (next) => {
    if (turning) return
    if (next && spread === last) return restart()
    if (!next && spread === 0) return
    playFlipSound(next ? 'next' : 'prev')
    setDirection(next ? 'next' : 'prev'); setTurning(true)
    window.setTimeout(() => { setSpread(i => i + (next ? 1 : -1)); setTurning(false) }, 410)
  }
  const restart = () => { if (!turning) { playFlipSound('prev'); setDirection('prev'); setTurning(true); window.setTimeout(() => { setSpread(0); setTurning(false) }, 410) } }
  useEffect(() => { const key = e => { if (e.key === 'ArrowRight') go(true); if (e.key === 'ArrowLeft') go(false) }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key) })
  const touchEnd = e => { if (startX.current === null) return; const delta = e.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 40) go(delta < 0); startX.current = null }
  const current = story.spreads[spread]

  return <main className={`reader ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`} onTouchStart={e => { startX.current = e.touches[0].clientX }} onTouchEnd={touchEnd}>
    <MusicToggle />
    <button className="home-tab" onClick={onHome}><span>⌂</span><b>Home</b></button>
    <section className="book-stage" aria-label={`${story.title}, spread ${spread + 1} of ${story.spreads.length}`}>
      <header className="book-header"><p>Little Storybook</p><h1>{story.title}</h1><span>Chapter {spread + 1}</span></header>
      <div className={`open-book ${turning ? `turning ${direction}` : ''}`}>
        <div className="page-stack left-stack" /><StoryPage page={current.left} side="left" image={current.art} onThemeChange={setTheme} />
        <div className="spine" />
        <StoryPage page={current.right} side="right" image={current.art} onThemeChange={setTheme} /><div className="page-stack right-stack" />
        {turning && <div className="turning-leaf" aria-hidden="true" />}
      </div>
      <button className={`bookmark ${menu ? 'open' : ''}`} onClick={() => setMenu(v => !v)} aria-expanded={menu} aria-label="Open story menu"><i /><i /><i /></button>
      {menu && <nav className="book-menu"><button onClick={onHome}>Story Home</button><button onClick={restart}>Restart Story</button><button onClick={() => alert('Gentle sounds and reduced motion follow your device settings.')}>Settings</button><button onClick={() => alert('A little storybook made for curious readers.')}>About</button></nav>}
    </section>
    <button className="next-tab" onClick={() => go(true)} aria-label={spread === last ? 'Read again' : 'Next page'}><span>{spread === last ? '↻' : '›'}</span><b>{spread === last ? 'Read\nAgain' : 'Next\nPage'}</b></button>
    <footer className="reader-controls"><button onClick={() => go(false)} disabled={spread === 0} aria-label="Previous page">‹</button><p>📖 <em>Click or swipe to turn the pages</em></p><button onClick={() => go(true)} aria-label="Next page">›</button></footer>
  </main>
}
