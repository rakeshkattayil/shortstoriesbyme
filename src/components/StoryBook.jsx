import { useEffect, useRef, useState } from 'react'
import StoryPage from './StoryPage'
import MusicToggle from './MusicToggle'

export default function StoryBook({ story, onHome }) {
  const [spread, setSpread] = useState(0), [turning, setTurning] = useState(false), [menu, setMenu] = useState(false), [direction, setDirection] = useState('next')
  const startX = useRef(null)
  const last = story.spreads.length - 1
  const go = (next) => {
    if (turning) return
    if (next && spread === last) return restart()
    if (!next && spread === 0) return
    setDirection(next ? 'next' : 'prev'); setTurning(true)
    window.setTimeout(() => { setSpread(i => i + (next ? 1 : -1)); setTurning(false) }, 410)
  }
  const restart = () => { if (!turning) { setDirection('prev'); setTurning(true); window.setTimeout(() => { setSpread(0); setTurning(false) }, 410) } }
  useEffect(() => { const key = e => { if (e.key === 'ArrowRight') go(true); if (e.key === 'ArrowLeft') go(false) }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key) })
  const touchEnd = e => { if (startX.current === null) return; const delta = e.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 40) go(delta < 0); startX.current = null }
  const current = story.spreads[spread]
  return <main className="reader" onTouchStart={e => { startX.current = e.touches[0].clientX }} onTouchEnd={touchEnd}>
    <MusicToggle />
    <button className="home-tab" onClick={onHome}><span>⌂</span><b>Home</b></button>
    <section className="book-stage" aria-label={`${story.title}, spread ${spread + 1} of ${story.spreads.length}`}>
      <header className="book-header"><p>Little Storybook</p><h1>{story.title}</h1><span>Chapter {spread + 1}</span></header>
      <div className={`open-book ${turning ? `turning ${direction}` : ''}`}>
        <div className="page-stack left-stack" /><StoryPage page={current.left} side="left" image={current.art} />
        <div className="spine" />
        <StoryPage page={current.right} side="right" image={current.art} /><div className="page-stack right-stack" />
        {turning && <div className="turning-leaf" aria-hidden="true" />}
      </div>
      <button className={`bookmark ${menu ? 'open' : ''}`} onClick={() => setMenu(v => !v)} aria-expanded={menu} aria-label="Open story menu"><i /><i /><i /></button>
      {menu && <nav className="book-menu"><button onClick={onHome}>Story Home</button><button onClick={restart}>Restart Story</button><button onClick={() => alert('Gentle sounds and reduced motion follow your device settings.')}>Settings</button><button onClick={() => alert('A little storybook made for curious readers.')}>About</button></nav>}
    </section>
    <button className="next-tab" onClick={() => go(true)} aria-label={spread === last ? 'Read again' : 'Next page'}><span>{spread === last ? '↻' : '›'}</span><b>{spread === last ? 'Read\nAgain' : 'Next\nPage'}</b></button>
    <footer className="reader-controls"><button onClick={() => go(false)} disabled={spread === 0} aria-label="Previous page">‹</button><p>📖 <em>Click or swipe to turn the pages</em></p><button onClick={() => go(true)} aria-label="Next page">›</button></footer>
  </main>
}
