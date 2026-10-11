import type { PageId } from '../App'
import Terminal from '../components/Terminal'

const who = [
  { title: 'Families & individuals', text: "everyday targets of phishing, UPI fraud, and SIM swap, usually with no one to ask before it's too late." },
  { title: 'Students & young adults', text: 'heavy social and messaging use, prime targets for job scams and account takeover.' },
  { title: 'Small teams & shops', text: 'no dedicated security staff, but real exposure through email, invoicing, and shared devices.' },
  { title: 'Community & senior groups', text: 'frequent targets of voice-based and impersonation scams, taught in plain language.' },
]

export default function Home({ active, onNavigate }: { active: boolean; onNavigate: (id: PageId) => void }) {
  const go = (id: PageId) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(id)
  }

  return (
    <section className={`page${active ? ' active' : ''}`} id="home">
      <h1>
        Cybercrime doesn't wait for
        <br />
        you to be ready.
      </h1>
      <p className="lede">
        A plain-language guide to recognizing scams the moment they happen, not after the money's gone. No jargon, no
        fear-mongering, just what to actually look for and what to do next.
      </p>
      <div className="cta-row">
        <a className="btn primary" onClick={go('spot')}>
          Learn to spot a scam
        </a>
        <a className="btn" onClick={go('play')}>
          Test yourself
        </a>
        <a className="btn" onClick={go('report')}>
          What to do if it happens
        </a>
      </div>

      <Terminal />

      <h2>What this guide covers</h2>
      <div className="cols3">
        <div className="who-item">
          <h3>Recognize it</h3>
          <p>
            The specific red flags in a message, call, or QR code that separate a scam from a routine request, before
            you tap anything.
          </p>
        </div>
        <div className="who-item">
          <h3>Prevent it</h3>
          <p>Simple habits for accounts, devices, and payment apps that close the doors attackers rely on most.</p>
        </div>
        <div className="who-item">
          <h3>Respond to it</h3>
          <p>
            What to do in the first hour after something goes wrong, who to call, what to freeze, what to save as
            evidence.
          </p>
        </div>
      </div>

      <h2 className="mt-lg">Who this is for</h2>
      <div className="cols2">
        {who.map((w) => (
          <div className="who-item" key={w.title}>
            <p>
              <b className="text-strong">{w.title}</b> <br />
              {w.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}