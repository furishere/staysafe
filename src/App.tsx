import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Spot from './pages/Spot'
import Report from './pages/Report'
import Play from './pages/Play'

export type PageId = 'home' | 'learn' | 'spot' | 'play' | 'report'

const ids: PageId[] = ['home', 'learn', 'spot', 'play', 'report']

function fromHash(): PageId {
  const h = window.location.hash.slice(1) as PageId
  return ids.includes(h) ? h : 'home'
}

export default function App() {
  const [page, setPage] = useState<PageId>(fromHash)
  const [menuOpen, setMenuOpen] = useState(false)

  function navigate(id: PageId) {
    window.location.hash = id // updates URL; hashchange listener updates the page
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const onHash = () => {
      setPage(fromHash())
      window.scrollTo(0, 0)
    }
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <Header page={page} menuOpen={menuOpen} onNavigate={navigate} onToggleMenu={() => setMenuOpen((o) => !o)} />
      <main className="wrap">
        <Home active={page === 'home'} onNavigate={navigate} />
        <Learn active={page === 'learn'} />
        <Spot active={page === 'spot'} />
        <Play active={page === 'play'} onNavigate={navigate} />
        <Report active={page === 'report'} />
      </main>
      <Footer />
    </>
  )
}