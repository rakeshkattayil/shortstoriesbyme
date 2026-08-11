import { useRef } from 'react'

export default function StoryPage({ page, side, image, onThemeChange }) {
  const articleRef = useRef(null)
  const imgRef = useRef(null)

  const handleImageLoad = () => {
    const img = imgRef.current
    if (!img) return
    const canvas = document.createElement('canvas')
    const w = 32, h = 32
    canvas.width = w; canvas.height = h
    const ctx = canvas.getContext('2d')
    try {
      ctx.drawImage(img, 0, 0, w, h)
      const data = ctx.getImageData(0, 0, w, h).data
      let total = 0, count = 0
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2]
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
        total += lum
        count++
      }
      const avg = total / count / 255
      const isDark = avg < 0.5
      if (onThemeChange) onThemeChange(isDark ? 'dark' : 'light')
      if (articleRef.current) {
        articleRef.current.classList.toggle('theme-dark', isDark)
        articleRef.current.classList.toggle('theme-light', !isDark)
      }
    } catch (e) {
      // ignore canvas errors (CORS etc.)
    }
  }

  return <article ref={articleRef} className={`story-page ${side} scene-${page.scene}`}>
    <img ref={imgRef} className="page-art" src={image} alt="Illustration from The Little Traveler" loading="eager" onLoad={handleImageLoad} />
    <div className="paper-wash" />
    <div className="story-copy"><p className="kicker">{page.kicker}</p><h2>{page.title}</h2><p className="body-copy">{page.text}</p><p className="caption">{page.caption}</p></div>
    <span className="folio">{side === 'left' ? '—' : '✦'}</span>
  </article>
}
