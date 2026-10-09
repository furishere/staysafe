import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Spot from './pages/Spot'
import Report from './pages/Report'

export type PageId = 'home' | 'learn' | 'spot' | 'report'

export default function App() {
  const [page, setPage] = useState<PageId>('home')
  const [menuOpen, setMenuOpen] = useState(false)

  function navigate(id: PageId) {
    setPage(id)
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <Header page={page} menuOpen={menuOpen} onNavigate={navigate} onToggleMenu={() => setMenuOpen((o) => !o)} />
      <main className="wrap">
        {/* All sections stay mounted (hidden via CSS), same as the original, so the feed doesn't restart */}
        <Home active={page === 'home'} onNavigate={navigate} />
        <Learn active={page === 'learn'} />
        <Spot active={page === 'spot'} />
        <Report active={page === 'report'} />
      </main>
      <Footer />
    </>
  )
}
