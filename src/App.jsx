import { useState } from 'react'
import { library, littleTraveler } from './data/stories'
import StoryBook from './components/StoryBook'

function Library({ onRead }) { return <main className="library"><div className="library-glow" /><header><p className="eyebrow">A tiny world of wonder</p><h1>Little Storybook</h1><p>Stories waiting to be discovered…</p></header><section className="shelf">{library.map(item => <article className={`story-card ${item.comingSoon ? 'coming-soon' : ''}`} key={item.id} onClick={() => !item.comingSoon && onRead()} tabIndex="0" onKeyDown={e => e.key === 'Enter' && !item.comingSoon && onRead()}><div className="cover-art">{item.id === 'little-traveler' && <img src={littleTraveler.cover} alt="The Little Traveler cover" />}{item.id === 'bear-stars' && '✦'}{item.id === 'milo-moon' && '☾'}</div><h2>{item.title}</h2><p>{item.comingSoon ? 'Coming soon' : 'Begin reading  →'}</p></article>)}</section></main> }
export default function App() { const [reading, setReading] = useState(false); return reading ? <StoryBook story={littleTraveler} onHome={() => setReading(false)} /> : <Library onRead={() => setReading(true)} /> }
