export default function StoryPage({ page, side, image }) {
  return <article className={`story-page ${side} scene-${page.scene}`}>
    <img className="page-art" src={image} alt="Illustration from The Little Traveler" loading="eager" />
    <div className="paper-wash" />
    <div className="story-copy"><p className="kicker">{page.kicker}</p><h2>{page.title}</h2><p className="body-copy">{page.text}</p><p className="caption">{page.caption}</p></div>
    <span className="folio">{side === 'left' ? '—' : '✦'}</span>
  </article>
}
