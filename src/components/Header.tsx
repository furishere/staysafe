import type { PageId } from '../App'

type Props = {
  page: PageId
  menuOpen: boolean
  onNavigate: (id: PageId) => void
  onToggleMenu: () => void
}

const links: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'learn', label: 'Learn' },
  { id: 'spot', label: 'Spot the Scam' },
  { id: 'report', label: 'How to Report' },
]

export default function Header({ page, menuOpen, onNavigate, onToggleMenu }: Props) {
  return (
    <header className="site">
      <div className="wrap">
        <a
          className="logo"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('home')
          }}
        >
          <span className="accent">&gt;</span> staysafe<span className="dim">.digital</span>
        </a>
        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={onToggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`main${menuOpen ? ' open' : ''}`} id="main-nav">
          {links.map((l) => (
            <a
              key={l.id}
              className={page === l.id ? 'active' : undefined}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(l.id)
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
